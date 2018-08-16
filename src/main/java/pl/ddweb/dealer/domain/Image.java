package pl.ddweb.dealer.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Arrays;
import java.util.Objects;

@Entity()
@Table(name = "image")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Image implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Transient
    @JsonSerialize
    @JsonDeserialize
    private byte[] img;

    @Column(name = "main")
    private boolean isMain;

    @Column(name = "img_content_type")
    private String imgContentType;

    @Column(name = "img_name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "car_id")
    @JsonIgnore
    private Car car;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImg() {
        return img;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    public boolean isMain() {
        return isMain;
    }

    public void setMain(boolean main) {
        isMain = main;
    }

    public String getImgContentType() {
        return imgContentType;
    }

    public void setImgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
    }

    public Car getCar() {
        return car;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Image car(Car car) {
        this.car = car;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Image image = (Image) o;
        return isMain == image.isMain &&
            Objects.equals(id, image.id) &&
            Arrays.equals(img, image.img) &&
            Objects.equals(imgContentType, image.imgContentType) &&
            Objects.equals(name, image.name) &&
            Objects.equals(car, image.car);
    }

    @Override
    public int hashCode() {

        int result = Objects.hash(id, isMain, imgContentType, name, car);
        result = 31 * result + Arrays.hashCode(img);
        return result;
    }

    @Override
    public String toString() {
        return "Image{" +
            "id=" + id +
            ", isMain=" + isMain +
            ", imgContentType='" + imgContentType + '\'' +
            ", name='" + name + '\'' +
            '}';
    }
}
