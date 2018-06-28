package pl.ddweb.dealer.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.ddweb.dealer.domain.Carousel;

@Repository
public interface CarouselRepository extends JpaRepository<Carousel,Long> {
}
