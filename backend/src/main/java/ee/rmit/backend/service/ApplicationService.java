package ee.rmit.backend.service;

import ee.rmit.backend.dto.ApplicationByAppServiceNamesDTO;
import ee.rmit.backend.model.AppServiceIndex;
import ee.rmit.backend.model.Application;
import ee.rmit.backend.model.ApplicationIndex;
import ee.rmit.backend.repository.ApplicationIndexRepository;
import ee.rmit.backend.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ApplicationIndexRepository applicationIndexRepository;
    private final AppServiceService appServiceService;

    @Autowired
    public ApplicationService(ApplicationRepository applicationRepository,
                              ApplicationIndexRepository applicationIndexRepository,
                              @Lazy AppServiceService appServiceService) {
        this.applicationRepository = applicationRepository;
        this.applicationIndexRepository = applicationIndexRepository;
        this.appServiceService = appServiceService;
    }

    public void saveApplication(Application application) {
        if (application.getDescription() != null && application.getDescription().length() > 20000) {
            throw new IllegalArgumentException("Description exceeds the maximum length of 20000 characters");
        }
        Application savedApplication = applicationRepository.save(application);
        ApplicationIndex applicationIndex = new ApplicationIndex();

        applicationIndex.setAppCode(savedApplication.getAppCode());
        applicationIndex.setName(savedApplication.getName());
        applicationIndex.setAppGroup(savedApplication.getAppGroup());
        applicationIndex.setAppType(savedApplication.getAppType());
        applicationIndex.setDescription(savedApplication.getDescription());
        applicationIndex.setAppCost(savedApplication.getAppCost());
        applicationIndex.setLastModified(new Date());

        List<AppServiceIndex> serviceIndexes = savedApplication.getServices().stream()
                .map(AppServiceService::createAppServiceIndex)
                .toList();

        applicationIndex.setServices(serviceIndexes);
        applicationIndexRepository.save(applicationIndex);
    }

    public List<ApplicationIndex> getApplicationsByName(String name) {
        return applicationIndexRepository.findByName(name);
    }

    public List<String> getAllApplicationCodes() {
        List<String> applicationCodes = new ArrayList<>();
        for (ApplicationIndex applicationIndex : applicationIndexRepository.findAll()) {
            applicationCodes.add(applicationIndex.getAppCode());
        }
        return applicationCodes;
    }

    public List<ApplicationByAppServiceNamesDTO> getApplicationsByServiceName(String serviceName) {
        List<AppServiceIndex> appServices = appServiceService.getAppServicesByName(serviceName);
        List<String> appCodes = appServices.stream()
                .map(AppServiceIndex::getAppCode)
                .distinct()
                .toList();
        List<ApplicationIndex> applicationIndexList = applicationIndexRepository.findAllByAppCodeIn(appCodes);
        List<ApplicationByAppServiceNamesDTO> applicationByAppServiceNamesDTOList = new ArrayList<>();
        for (ApplicationIndex applicationIndex : applicationIndexList) {
            ApplicationByAppServiceNamesDTO applicationByAppServiceNamesDTO = getApplicationDTO(applicationIndex, appServices);
            applicationByAppServiceNamesDTOList.add(applicationByAppServiceNamesDTO);
        }
        return applicationByAppServiceNamesDTOList;
    }

    private static ApplicationByAppServiceNamesDTO getApplicationDTO(ApplicationIndex applicationIndex, List<AppServiceIndex> appServiceIndexList) {
        ApplicationByAppServiceNamesDTO applicationByAppServiceNamesDTO = new ApplicationByAppServiceNamesDTO();
        List<String> appServiceNames = new ArrayList<>();
        applicationByAppServiceNamesDTO.setAppCode(applicationIndex.getAppCode());
        applicationByAppServiceNamesDTO.setName(applicationIndex.getName());
        applicationByAppServiceNamesDTO.setDescription(applicationIndex.getDescription());
        applicationByAppServiceNamesDTO.setAppGroup(applicationIndex.getAppGroup());
        applicationByAppServiceNamesDTO.setAppType(applicationIndex.getAppType());
        applicationByAppServiceNamesDTO.setAppCost(applicationIndex.getAppCost());
        applicationByAppServiceNamesDTO.setLastModified(applicationIndex.getLastModified());
        for (AppServiceIndex appServiceIndex : applicationIndex.getServices()) {
            for (AppServiceIndex appServiceIndex1 : appServiceIndexList) {
                if (appServiceIndex.getName().equals(appServiceIndex1.getName()) && !appServiceNames.contains(appServiceIndex.getName())) {
                    appServiceNames.add(appServiceIndex.getName());
                }
            }
        }
        applicationByAppServiceNamesDTO.setServiceNames(appServiceNames);
        return applicationByAppServiceNamesDTO;
    }
}
