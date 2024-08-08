package ee.rmit.backend.dto;

import ee.rmit.backend.model.AppServiceIndex;

import java.util.List;

public class AppServicesByApplicationNameDTO {

    private String applicationName;

    private List<AppServiceIndex> appServiceIndexes;

    public String getApplicationName() {
        return applicationName;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }

    public List<AppServiceIndex> getAppServiceIndexes() {
        return appServiceIndexes;
    }

    public void setAppServiceIndexes(List<AppServiceIndex> appServiceIndexes) {
        this.appServiceIndexes = appServiceIndexes;
    }
}
