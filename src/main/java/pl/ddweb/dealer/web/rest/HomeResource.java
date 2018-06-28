package pl.ddweb.dealer.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.ddweb.dealer.domain.Contact;
import pl.ddweb.dealer.domain.Home;
import pl.ddweb.dealer.repository.HomeRepository;
import pl.ddweb.dealer.web.rest.errors.BadRequestAlertException;
import pl.ddweb.dealer.web.rest.util.HeaderUtil;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class HomeResource {

    private final Logger log = LoggerFactory.getLogger(HomeResource.class);

    private HomeRepository homeRepository;

    private static final String ENTITY_NAME = "home";

    public HomeResource(HomeRepository homeRepository) {
        this.homeRepository = homeRepository;
    }

    @PostMapping("/home")
    @Timed
    public ResponseEntity<Home> createHome(@Valid @RequestBody Home home) throws URISyntaxException {
        log.debug("REST request to save Contact : {}", home);
        if (home.getId() != null) {
            throw new BadRequestAlertException("A new home cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Home result = homeRepository.save(home);
        return ResponseEntity.created(new URI("/api/contacts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contacts : Updates an existing contact.
     *
     * @param home the contact to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contact,
     * or with status 400 (Bad Request) if the contact is not valid,
     * or with status 500 (Internal Server Error) if the contact couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/home")
    @Timed
    public ResponseEntity<Home> updateHome(@Valid @RequestBody Home home) throws URISyntaxException {
        log.debug("REST request to update Home : {}", home);
        if (home.getId() == null) {
            return createHome(home);
        }
        Home result = homeRepository.save(home);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, home.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contacts : get all the contacts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of contacts in body
     */
    @GetMapping("/home")
    @Timed
    public ResponseEntity<Home> getHome() {
        log.debug("REST request to get first home element");
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(homeRepository.findAll().get(0)));
    }
}
