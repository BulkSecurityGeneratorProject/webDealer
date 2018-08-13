package pl.ddweb.dealer.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.ddweb.dealer.domain.Carousel;
import pl.ddweb.dealer.repository.CarouselRepository;
import pl.ddweb.dealer.web.rest.errors.BadRequestAlertException;
import pl.ddweb.dealer.web.rest.util.HeaderUtil;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


@RestController
@RequestMapping("/api")
public class CarouselResource {

    private CarouselRepository carouselRepository;

    private Logger log = LoggerFactory.getLogger(CarouselResource.class);

    private static final String ENTITY_NAME = "Carousel";

    public CarouselResource(CarouselRepository carouselRepository) {
        this.carouselRepository = carouselRepository;
    }


    @PostMapping("/carousel")
    @Timed
    public ResponseEntity<Carousel> createCarousel(@Valid @RequestBody Carousel carousel) throws URISyntaxException {
        log.debug("REST request to save Contact : {}", carousel);
        if (carousel.getId() != null) {
            throw new BadRequestAlertException("A new caorusel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Carousel result = carouselRepository.save(carousel);
        return ResponseEntity.created(new URI("/api/carousel/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contacts : Updates an existing contact.
     *
     * @param carousel the contact to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contact,
     * or with status 400 (Bad Request) if the contact is not valid,
     * or with status 500 (Internal Server Error) if the contact couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/carousel")
    @Timed
    public ResponseEntity<List<Carousel>> updateCarousel(@Valid @RequestBody List<Carousel> carousel) throws URISyntaxException {
        log.debug("REST request to update Carousel : {}", carousel);
        List<Carousel> result = carouselRepository.save(carousel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME,"ALL"))
            .body(result);
    }

    /**
     * GET  /contacts : get all the contacts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of contacts in body
     */
    @GetMapping("/carousel")
    @Timed
    public List<Carousel> getCarousel() {
        log.debug("REST request to get first home element");
        return carouselRepository.findAll();
    }

}
