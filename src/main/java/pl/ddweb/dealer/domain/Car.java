package pl.ddweb.dealer.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;
import pl.ddweb.dealer.domain.enumeration.Gear;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * A Car.
 */
@Entity
@Table(name = "car")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Car extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "make", nullable = false)
    private String make;

    @NotNull
    @Column(name = "model", nullable = false)
    private String model;

    @NotNull
    @Column(name = "price", nullable = false)
    private Long price;

    @NotNull
    @Column(name = "jhi_year", nullable = false)
    private Long year;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "gear", nullable = false)
    private Gear gear;

    @Column(name = "version")
    private String version;

    @Column(name = "capacity")
    private Double capacity;

    @Column(name = "power")
    private Long power;

    @Column(name = "color")
    private String color;

    @Column(name = "mileage")
    private Long mileage;

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true, targetEntity = Image.class)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private List<Image> images = new ArrayList<>();

    @Lob
    @Type(type = "text")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull
    @Column(name = "received", nullable = false)
    private Boolean received;

    @NotNull
    @Column(name = "broken", nullable = false)
    private Boolean broken;

    @Transient
    @JsonSerialize
    @JsonDeserialize
    private Instant created;

    @JsonSerialize
    @JsonDeserialize
    @Transient
    private Instant lastModified;

    public Car() {
        this.created = getCreatedDate();
        this.lastModified = getLastModifiedDate();
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMake() {
        return make;
    }

    public Car make(String make) {
        this.make = make;
        return this;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public Car model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Long getPrice() {
        return price;
    }

    public Car price(Long price) {
        this.price = price;
        return this;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Long getYear() {
        return year;
    }

    public Car year(Long year) {
        this.year = year;
        return this;
    }

    public void setYear(Long year) {
        this.year = year;
    }

    public Gear getGear() {
        return gear;
    }

    public Car gear(Gear gear) {
        this.gear = gear;
        return this;
    }

    public void setGear(Gear gear) {
        this.gear = gear;
    }

    public String getVersion() {
        return version;
    }

    public Car version(String version) {
        this.version = version;
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public Double getCapacity() {
        return capacity;
    }

    public Car capacity(Double capacity) {
        this.capacity = capacity;
        return this;
    }

    public void setCapacity(Double capacity) {
        this.capacity = capacity;
    }

    public Long getPower() {
        return power;
    }

    public Car power(Long power) {
        this.power = power;
        return this;
    }

    public void setPower(Long power) {
        this.power = power;
    }

    public String getColor() {
        return color;
    }

    public Car color(String color) {
        this.color = color;
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Long getMileage() {
        return mileage;
    }

    public Car mileage(Long mileage) {
        this.mileage = mileage;
        return this;
    }

    public void setMileage(Long mileage) {
        this.mileage = mileage;
    }


    public String getDescription() {
        return description;
    }

    public Car description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isReceived() {
        return received;
    }

    public Car received(Boolean received) {
        this.received = received;
        return this;
    }

    public void setReceived(Boolean received) {
        this.received = received;
    }

    public Boolean isBroken() {
        return broken;
    }

    public Car broken(Boolean broken) {
        this.broken = broken;
        return this;
    }

    public void setBroken(Boolean broken) {
        this.broken = broken;
    }

    public Instant getCreated() {
        return created;
    }

    public void setCreated(Instant created) {
        this.created = created;
    }

    public Instant getLastModified() {
        return lastModified;
    }

    public void setLastModified(Instant lastModified) {
        this.lastModified = lastModified;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public Boolean getReceived() {
        return received;
    }

    public Boolean getBroken() {
        return broken;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Car car = (Car) o;
        return Objects.equals(id, car.id) &&
            Objects.equals(make, car.make) &&
            Objects.equals(model, car.model) &&
            Objects.equals(price, car.price) &&
            Objects.equals(year, car.year) &&
            gear == car.gear &&
            Objects.equals(version, car.version) &&
            Objects.equals(capacity, car.capacity) &&
            Objects.equals(power, car.power) &&
            Objects.equals(color, car.color) &&
            Objects.equals(mileage, car.mileage) &&
            Objects.equals(images, car.images) &&
            Objects.equals(description, car.description) &&
            Objects.equals(received, car.received) &&
            Objects.equals(broken, car.broken) &&
            Objects.equals(created, car.created) &&
            Objects.equals(lastModified, car.lastModified);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, make, model, price, year, gear, version, capacity, power, color, mileage, images, description, received, broken, created, lastModified);
    }

    @Override
    public String toString() {
        return "Car{" +
            "id=" + id +
            ", make='" + make + '\'' +
            ", model='" + model + '\'' +
            ", price=" + price +
            ", year=" + year +
            ", gear=" + gear +
            ", version='" + version + '\'' +
            ", capacity=" + capacity +
            ", power=" + power +
            ", color='" + color + '\'' +
            ", mileage=" + mileage +
            ", images=" + images +
            ", description='" + description + '\'' +
            ", received=" + received +
            ", broken=" + broken +
            ", created=" + created +
            ", lastModified=" + lastModified +
            '}';
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove


}
