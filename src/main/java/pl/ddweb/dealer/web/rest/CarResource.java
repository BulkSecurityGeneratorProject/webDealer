package pl.ddweb.dealer.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.ddweb.dealer.domain.Car;
import pl.ddweb.dealer.repository.CarRepository;
import pl.ddweb.dealer.web.rest.errors.BadRequestAlertException;
import pl.ddweb.dealer.web.rest.util.HeaderUtil;
import pl.ddweb.dealer.web.rest.util.PaginationUtil;
import pl.ddweb.dealer.web.rest.util.image.ImageService;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Car.
 */
@RestController
@RequestMapping("/api")
public class CarResource {

    private final Logger log = LoggerFactory.getLogger(CarResource.class);

    private static final String ENTITY_NAME = "car";

    private final CarRepository carRepository;

    private final ImageService imageService;

    public CarResource(CarRepository carRepository, ImageService imageService) {
        this.carRepository = carRepository;
        this.imageService = imageService;
    }

    /**
     * POST  /cars : Create a new car.
     *
     * @param car the car to create
     * @return the ResponseEntity with status 201 (Created) and with body the new car, or with status 400 (Bad Request) if the car has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cars")
    @Timed
    public ResponseEntity<Car> createCar(@Valid @RequestBody Car car) throws URISyntaxException {
        log.debug("REST request to save Car : {}", car);
        if (car.getId() != null) {
            throw new BadRequestAlertException("A new car cannot already have an ID", ENTITY_NAME, "idexists");
        }
        car.setCreatedDate(car.getCreated());
        car.getImages().forEach(image -> image.car(car));
        imageService.setMainImage(car.getImages());
        Car result = carRepository.save(car);
        imageService.saveChangeImagesToSize(result.getId(), car.getImages());
        return ResponseEntity.created(new URI("/api/cars/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cars : Updates an existing car.
     *
     * @param car the car to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated car,
     * or with status 400 (Bad Request) if the car is not valid,
     * or with status 500 (Internal Server Error) if the car couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cars")
    @Timed
    public ResponseEntity<Car> updateCar(@Valid @RequestBody Car car) throws URISyntaxException {
        log.debug("REST request to update Car : {}", car);
        if (car.getId() == null) {
            return createCar(car);
        }
        car.setCreatedDate(car.getCreated());
        car.getImages().forEach(image -> image.car(car));
        imageService.setMainImage(car.getImages());
        Car result = carRepository.save(car);
        imageService.updateImages(result.getId(),car.getImages());
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, car.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cars : get all the cars.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cars in body
     */
    @GetMapping("/cars/list/{received}")
    @Timed
    public ResponseEntity<List<Car>> getAllCars(@PathVariable String received, Pageable pageable) {
        log.debug("REST request to get a page of Cars");
        Iterator<Sort.Order> iter = pageable.getSort().iterator();
        Sort.Order order = iter.next();
        Page<Car> page = order.getProperty().equals("id") ?
            carRepository.findAllByReceivedOrderByCreatedDateDesc(received.equals("true"),pageable) :
            carRepository.findAllByReceived(received.equals("true"), pageable);
        page.getContent().forEach(c -> {
            c.setCreated(c.getCreatedDate());
            c.setLastModified(c.getLastModifiedDate());
            c.getImages().forEach(e ->{
                e.setImg(null);
            });
        });
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cars");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /cars/:id : get the "id" car.
     *
     * @param id the id of the car to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the car, or with status 404 (Not Found)
     */
    @GetMapping("/cars/{id}")
    @Timed
    public ResponseEntity<Car> getCar(@PathVariable("id") Long id) {
        log.debug("REST request to get Car : {}", id);
        Car car = carRepository.findOneByIdOrderByCreatedDateDesc(id);
        car.setLastModified(car.getLastModifiedDate());
        car.setCreated(car.getCreatedDate());
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(car));
    }

    /**
     * DELETE  /cars/:id : delete the "id" car.
     *
     * @param id the id of the car to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cars/{id}")
    @Timed
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        log.debug("REST request to delete Car : {}", id);
        imageService.deleteCar(id);
        carRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
