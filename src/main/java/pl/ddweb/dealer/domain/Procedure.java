package pl.ddweb.dealer.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "procedure")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Procedure implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;


    @Lob
    @Type(type = "text")
    @Column(name = "text", columnDefinition = "TEXT")
    @NotNull
    private String text;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Procedure procedure = (Procedure) o;
        return Objects.equals(id, procedure.id) &&
            Objects.equals(text, procedure.text);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, text);
    }

    @Override
    public String toString() {
        return "Procedure{" +
            "id=" + id +
            ", text='" + text + '\'' +
            '}';
    }
}
