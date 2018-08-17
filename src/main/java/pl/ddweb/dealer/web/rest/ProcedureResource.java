package pl.ddweb.dealer.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.ddweb.dealer.domain.Procedure;
import pl.ddweb.dealer.repository.ProcedureRepository;
import pl.ddweb.dealer.web.rest.errors.BadRequestAlertException;
import pl.ddweb.dealer.web.rest.util.HeaderUtil;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class ProcedureResource {

    private final Logger log = LoggerFactory.getLogger(HomeResource.class);

    private ProcedureRepository procedureRepository;

    private static final String ENTITY_NAME = "procedure";

    public ProcedureResource(ProcedureRepository procedureRepository) {
        this.procedureRepository = procedureRepository;
    }

    @PostMapping("/procedure")
    @Timed
    public ResponseEntity<Procedure> createProcedure(@Valid @RequestBody Procedure procedure) throws URISyntaxException {
        log.debug("REST request to save Contact : {}", procedure);
        if (procedure.getId() != null) {
            throw new BadRequestAlertException("A new home cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Procedure result = procedureRepository.save(procedure);
        return ResponseEntity.created(new URI("/api/procedure/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contacts : Updates an existing contact.
     *
     * @param procedure the contact to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contact,
     * or with status 400 (Bad Request) if the contact is not valid,
     * or with status 500 (Internal Server Error) if the contact couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/procedure")
    @Timed
    public ResponseEntity<Procedure> updateProcedure(@Valid @RequestBody Procedure procedure) throws URISyntaxException {
        log.debug("REST request to update Home : {}", procedure);
        if (procedure.getId() == null) {
            return createProcedure(procedure);
        }
        Procedure result = procedureRepository.save(procedure);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, procedure.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contacts : get all the contacts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of contacts in body
     */
    @GetMapping("/procedure")
    @Timed
    public ResponseEntity<Procedure> getHome() {
        log.debug("REST request to get first home element");
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(procedureRepository.findAll().get(0)));
    }
}
