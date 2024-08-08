package ee.rmit.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Application {

    @Id
    @NotBlank
    private String appCode;
    @NotBlank
    private String name;
    @NotBlank
    private String appGroup;
    @NotBlank
    private String appType;
    @Column(length = 20000)
    @Size(max = 20000, message = "Description can have up to 20000 characters")
    private String description;
    @NotNull
    @PositiveOrZero
    private double appCost;
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModified;

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL)
    private List<AppService> services = new ArrayList<>();

    public String getAppCode() {
        return appCode;
    }

    public void setAppCode(String appCode) {
        this.appCode = appCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAppGroup() {
        return appGroup;
    }

    public void setAppGroup(String appGroup) {
        this.appGroup = appGroup;
    }

    public String getAppType() {
        return appType;
    }

    public void setAppType(String appType) {
        this.appType = appType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAppCost() {
        return appCost;
    }

    public void setAppCost(double appCost) {
        this.appCost = appCost;
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    public List<AppService> getServices() {
        return services;
    }

    public void setServices(List<AppService> services) {
        this.services = services;
    }
}
