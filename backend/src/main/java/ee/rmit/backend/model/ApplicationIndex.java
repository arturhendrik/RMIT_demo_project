package ee.rmit.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Date;
import java.util.List;

@Document(indexName = "applications")
public class ApplicationIndex {

    @Id
    @Field(type = FieldType.Keyword)
    private String appCode;
    @Field(type = FieldType.Text)
    private String name;
    private String appGroup;
    private String appType;
    private String description;
    private double appCost;
    private Date lastModified;
    @Field(type = FieldType.Nested, includeInParent = true) // Specifies 'services' as a nested object
    private List<AppServiceIndex> services;


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

    public List<AppServiceIndex> getServices() {
        return services;
    }

    public void setServices(List<AppServiceIndex> services) {
        this.services = services;
    }
}
