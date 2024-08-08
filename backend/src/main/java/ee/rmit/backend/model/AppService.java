package ee.rmit.backend.model;

import ee.rmit.backend.enums.SubType;
import ee.rmit.backend.enums.Type;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Date;

@Entity
public class AppService {

    @Id
    @NotBlank
    private String serviceCode;
    @NotBlank
    private String name;
    @Enumerated(EnumType.STRING)
    private Type type;
    @Enumerated(EnumType.STRING)
    private SubType subType;
    @Column(length = 20000)
    @Size(max = 20000, message = "Description can have up to 20000 characters")
    private String description;
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModified;

    @ManyToOne
    @JoinColumn(name = "app_code", nullable = false)
    @NotNull
    private Application application;

    public String getServiceCode() {
        return serviceCode;
    }

    public void setServiceCode(String serviceCode) {
        this.serviceCode = serviceCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public SubType getSubType() {
        return subType;
    }

    public void setSubType(SubType subType) {
        this.subType = subType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    public Application getApplication() {
        return application;
    }

    public void setApplication(Application application) {
        this.application = application;
    }
}
