package pl.ddweb.dealer.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Lob
    @Column(name = "img")
    @Basic(fetch = FetchType.LAZY)
    private byte[] img;

    @Lob
    @Column(name = "img_thumbnail")
    private byte[] thumbnail;

    @Column(name = "main")
    private boolean isMain;

    @Column(name = "img_content_type")
    private String imgContentType;

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

    public Image car(Car car) {
        this.car = car;
        return this;
    }

    public byte[] getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(byte[] thumbnail) {
        this.thumbnail = thumbnail;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Image image = (Image) o;
        return isMain == image.isMain &&
            Objects.equals(id, image.id) &&
            Arrays.equals(img, image.img) &&
            Arrays.equals(thumbnail, image.thumbnail) &&
            Objects.equals(imgContentType, image.imgContentType) &&
            Objects.equals(car, image.car);
    }

    @Override
    public int hashCode() {

        int result = Objects.hash(id, isMain, imgContentType, car);
        result = 31 * result + Arrays.hashCode(img);
        result = 31 * result + Arrays.hashCode(thumbnail);
        return result;
    }

    @Override
    public String toString() {
        return "Image{" +
            "id=" + id +
            ", isMain=" + isMain +
            ", imgContentType='" + imgContentType + '\'' +
            '}';
    }
}
