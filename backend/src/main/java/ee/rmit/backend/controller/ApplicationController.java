package ee.rmit.backend.controller;

import ee.rmit.backend.dto.ApplicationByAppServiceNamesDTO;
import ee.rmit.backend.model.Application;
import ee.rmit.backend.repository.ApplicationRepository;
import ee.rmit.backend.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    private final ApplicationService applicationService;
    private final ApplicationRepository applicationRepository;

    @Autowired
    public ApplicationController(ApplicationService applicationService, ApplicationRepository applicationRepository) {
        this.applicationService = applicationService;
        this.applicationRepository = applicationRepository;
    }

    @PostMapping
    public ResponseEntity<String> createApplication(@Valid @RequestBody Application application) {
        if (applicationRepository.existsById(application.getAppCode())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Application with this appCode already exists");
        } else {
            applicationService.saveApplication(application);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Application created successfully");
        }
    }

    @GetMapping("/search-by-service/{name}")
    public List<ApplicationByAppServiceNamesDTO> getApplicationsByServiceName(@PathVariable String name) {
        return applicationService.getApplicationsByServiceName(name);
    }

    @GetMapping("/codes")
    public List<String> getAllApplicationCodes() {
        return applicationService.getAllApplicationCodes();
    }
}
