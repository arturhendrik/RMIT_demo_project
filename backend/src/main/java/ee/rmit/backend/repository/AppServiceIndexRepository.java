package ee.rmit.backend.repository;

import ee.rmit.backend.model.AppServiceIndex;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface AppServiceIndexRepository extends ElasticsearchRepository<AppServiceIndex, String> {
    List<AppServiceIndex> findByName(String name);
}
