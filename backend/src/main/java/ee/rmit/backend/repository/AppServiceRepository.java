package ee.rmit.backend.repository;

import ee.rmit.backend.model.AppService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppServiceRepository extends JpaRepository<AppService, String> {
}
