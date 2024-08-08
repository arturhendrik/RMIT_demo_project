package ee.rmit.backend.controller;

import ee.rmit.backend.dto.AppServicesByApplicationNameDTO;
import ee.rmit.backend.model.AppService;
import ee.rmit.backend.repository.AppServiceRepository;
import ee.rmit.backend.service.AppServiceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
public class AppServiceController {

    private final AppServiceService appServiceService;
    private final AppServiceRepository appServiceRepository;

    @Autowired
    public AppServiceController(AppServiceService appServiceService, AppServiceRepository appServiceRepository) {
        this.appServiceService = appServiceService;
        this.appServiceRepository = appServiceRepository;
    }

    @PostMapping
    public ResponseEntity<String> createAppService (@Valid @RequestBody AppService appService) {
        if (appServiceRepository.existsById(appService.getServiceCode())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("AppService with this serviceCode already exists");
        } else {
            appServiceService.saveAppService(appService);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("AppService created successfully");
        }
    }

    @GetMapping("/search-by-application/{name}")
    public List<AppServicesByApplicationNameDTO> getServicesByApplicationName(@PathVariable String name) {
        return appServiceService.getAppServicesByApplicationName(name);
    }
}
