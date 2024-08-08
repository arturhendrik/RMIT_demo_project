package ee.rmit.backend.repository;

import ee.rmit.backend.model.ApplicationIndex;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface ApplicationIndexRepository extends ElasticsearchRepository<ApplicationIndex, String> {
    List<ApplicationIndex> findByName(String name);
    List<ApplicationIndex> findAllByAppCodeIn(List<String> appCodes);
}
