package pl.ddweb.dealer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.ddweb.dealer.domain.Home;

@Repository
public interface HomeRepository extends JpaRepository<Home,Long> {


}
