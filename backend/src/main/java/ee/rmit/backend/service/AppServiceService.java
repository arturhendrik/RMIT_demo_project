package ee.rmit.backend.service;

import ee.rmit.backend.dto.AppServicesByApplicationNameDTO;
import ee.rmit.backend.model.AppService;
import ee.rmit.backend.model.AppServiceIndex;
import ee.rmit.backend.model.Application;
import ee.rmit.backend.model.ApplicationIndex;
import ee.rmit.backend.repository.AppServiceIndexRepository;
import ee.rmit.backend.repository.AppServiceRepository;
import ee.rmit.backend.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class AppServiceService {

    private final AppServiceRepository appServiceRepository;
    private final AppServiceIndexRepository appServiceIndexRepository;
    private final ApplicationService applicationService;
    private final ApplicationRepository applicationRepository;

    @Autowired
    public AppServiceService(AppServiceRepository appServiceRepository,
                             AppServiceIndexRepository appServiceIndexRepository,
                             @Lazy ApplicationService applicationService, ApplicationRepository applicationRepository) {
        this.appServiceRepository = appServiceRepository;
        this.appServiceIndexRepository = appServiceIndexRepository;
        this.applicationService = applicationService;
        this.applicationRepository = applicationRepository;
    }

    public void saveAppService(AppService appService) {
        if (appService.getDescription() != null && appService.getDescription().length() > 20000) {
            throw new IllegalArgumentException("Description exceeds the maximum length of 20000 characters");
        }
        Application application = applicationRepository.findById(appService.getApplication().getAppCode()).orElseThrow(() -> new RuntimeException("Application not found"));
        List<AppService> applicationServices = application.getServices();
        applicationServices.add(appService);
        application.setServices(applicationServices);

        applicationService.saveApplication(application);

        AppService savedAppService = appServiceRepository.save(appService);
        AppServiceIndex appServiceIndex = createAppServiceIndex(savedAppService);

        appServiceIndexRepository.save(appServiceIndex);
    }

    static AppServiceIndex createAppServiceIndex(AppService savedAppService) {
        AppServiceIndex appServiceIndex = new AppServiceIndex();

        appServiceIndex.setServiceCode(savedAppService.getServiceCode());
        appServiceIndex.setName(savedAppService.getName());
        appServiceIndex.setType(savedAppService.getType());
        appServiceIndex.setSubType(savedAppService.getSubType());
        appServiceIndex.setDescription(savedAppService.getDescription());
        appServiceIndex.setLastModified(new Date());
        appServiceIndex.setAppCode(savedAppService.getApplication().getAppCode());

        return appServiceIndex;
    }

    public List<AppServiceIndex> getAppServicesByName(String name) {
        return appServiceIndexRepository.findByName(name);
    }

    public List<AppServicesByApplicationNameDTO> getAppServicesByApplicationName(String applicationName) {
        List<ApplicationIndex> applications = applicationService.getApplicationsByName(applicationName);
        List<AppServicesByApplicationNameDTO> appServicesByApplicationNameDTOList = new ArrayList<>();
        for (ApplicationIndex applicationIndex : applications) {
            AppServicesByApplicationNameDTO appServicesByApplicationNameDTO = new AppServicesByApplicationNameDTO();
            appServicesByApplicationNameDTO.setApplicationName(applicationIndex.getName());
            appServicesByApplicationNameDTO.setAppServiceIndexes(applicationIndex.getServices());
            appServicesByApplicationNameDTOList.add(appServicesByApplicationNameDTO);
        }
        return appServicesByApplicationNameDTOList;
    }
}
