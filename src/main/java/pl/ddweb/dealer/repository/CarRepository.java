package pl.ddweb.dealer.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.ddweb.dealer.domain.Car;


/**
 * Spring Data JPA repository for the Car entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    Page<Car> findAllByReceived(Boolean received, Pageable pageable);

    Page<Car> findAllByReceivedOrderByCreatedDateDesc(Boolean received, Pageable pageable);

    Car findOneByIdOrderByCreatedDateDesc(Long id);
}
