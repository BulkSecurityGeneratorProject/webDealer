package pl.ddweb.dealer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.ddweb.dealer.domain.Procedure;

public interface ProcedureRepository extends JpaRepository<Procedure,Long> {

}
