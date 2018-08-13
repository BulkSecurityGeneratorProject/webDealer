package pl.ddweb.dealer.domain;

import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "Carousel")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Carousel implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "sub_title", nullable = false)
    private String subtitle;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Carousel carousel = (Carousel) o;
        return Objects.equals(id, carousel.id) &&
            Objects.equals(title, carousel.title) &&
            Objects.equals(subtitle, carousel.subtitle);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, title, subtitle);
    }

    @Override
    public String toString() {
        return "Carousel{" +
            "id=" + id +
            ", title='" + title + '\'' +
            ", subtitle='" + subtitle + '\'' +
            '}';
    }
}
