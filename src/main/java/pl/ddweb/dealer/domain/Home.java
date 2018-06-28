package pl.ddweb.dealer.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Table(name = "Home")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Home implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "home_label", nullable = false)
    private String homeLabel;
    @NotNull
    @Column(name = "first_paragraph", nullable = false)
    private String firstParagraph;
    @NotNull
    @Column(name = "second_paragraph", nullable = false)
    private String secondParagraph;
    @NotNull
    @Column(name = "first_icon", nullable = false)
    private String firstIcon;

    @NotNull
    @Column(name = "first_icon_subtitle",nullable = false)
    private String firstIconSubtitle;

    @NotNull
    @Column(name = "second_icon", nullable = false)
    private String secondIcon;

    @NotNull
    @Column(name = "second_icon_subtitle",nullable = false)
    private String secondIconSubtitle;


    @NotNull
    @Column(name = "third_icon", nullable = false)
    private String thirdIcon;


    @NotNull
    @Column(name = "third_icon_subtitle",nullable = false)
    private String thirdIconSubtitle;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHomeLabel() {
        return homeLabel;
    }

    public void setHomeLabel(String homeLabel) {
        this.homeLabel = homeLabel;
    }

    public String getFirstParagraph() {
        return firstParagraph;
    }

    public void setFirstParagraph(String firstParagraph) {
        this.firstParagraph = firstParagraph;
    }

    public String getSecondParagraph() {
        return secondParagraph;
    }

    public void setSecondParagraph(String secondParagraph) {
        this.secondParagraph = secondParagraph;
    }

    public String getFirstIcon() {
        return firstIcon;
    }

    public void setFirstIcon(String firstIcon) {
        this.firstIcon = firstIcon;
    }

    public String getSecondIcon() {
        return secondIcon;
    }

    public void setSecondIcon(String secondIcon) {
        this.secondIcon = secondIcon;
    }

    public String getThirdIcon() {
        return thirdIcon;
    }

    public void setThirdIcon(String thirdIcon) {
        this.thirdIcon = thirdIcon;
    }


    public String getFirstIconSubtitle() {
        return firstIconSubtitle;
    }

    public void setFirstIconSubtitle(String firstIconSubtitle) {
        this.firstIconSubtitle = firstIconSubtitle;
    }

    public String getSecondIconSubtitle() {
        return secondIconSubtitle;
    }

    public void setSecondIconSubtitle(String secondIconSubtitle) {
        this.secondIconSubtitle = secondIconSubtitle;
    }

    public String getThirdIconSubtitle() {
        return thirdIconSubtitle;
    }

    public void setThirdIconSubtitle(String thirdIconSubtitle) {
        this.thirdIconSubtitle = thirdIconSubtitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Home home = (Home) o;

        if (id != null ? !id.equals(home.id) : home.id != null) return false;
        if (homeLabel != null ? !homeLabel.equals(home.homeLabel) : home.homeLabel != null) return false;
        if (firstParagraph != null ? !firstParagraph.equals(home.firstParagraph) : home.firstParagraph != null)
            return false;
        if (secondParagraph != null ? !secondParagraph.equals(home.secondParagraph) : home.secondParagraph != null)
            return false;
        if (firstIcon != null ? !firstIcon.equals(home.firstIcon) : home.firstIcon != null) return false;
        if (firstIconSubtitle != null ? !firstIconSubtitle.equals(home.firstIconSubtitle) : home.firstIconSubtitle != null)
            return false;
        if (secondIcon != null ? !secondIcon.equals(home.secondIcon) : home.secondIcon != null) return false;
        if (secondIconSubtitle != null ? !secondIconSubtitle.equals(home.secondIconSubtitle) : home.secondIconSubtitle != null)
            return false;
        if (thirdIcon != null ? !thirdIcon.equals(home.thirdIcon) : home.thirdIcon != null) return false;
        return thirdIconSubtitle != null ? thirdIconSubtitle.equals(home.thirdIconSubtitle) : home.thirdIconSubtitle == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (homeLabel != null ? homeLabel.hashCode() : 0);
        result = 31 * result + (firstParagraph != null ? firstParagraph.hashCode() : 0);
        result = 31 * result + (secondParagraph != null ? secondParagraph.hashCode() : 0);
        result = 31 * result + (firstIcon != null ? firstIcon.hashCode() : 0);
        result = 31 * result + (firstIconSubtitle != null ? firstIconSubtitle.hashCode() : 0);
        result = 31 * result + (secondIcon != null ? secondIcon.hashCode() : 0);
        result = 31 * result + (secondIconSubtitle != null ? secondIconSubtitle.hashCode() : 0);
        result = 31 * result + (thirdIcon != null ? thirdIcon.hashCode() : 0);
        result = 31 * result + (thirdIconSubtitle != null ? thirdIconSubtitle.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Home{" +
            "id=" + id +
            ", homeLabel='" + homeLabel + '\'' +
            ", firstParagraph='" + firstParagraph + '\'' +
            ", secondParagraph='" + secondParagraph + '\'' +
            ", firstIcon='" + firstIcon + '\'' +
            ", firstIconSubtitle='" + firstIconSubtitle + '\'' +
            ", secondIcon='" + secondIcon + '\'' +
            ", secondIconSubtitle='" + secondIconSubtitle + '\'' +
            ", thirdIcon='" + thirdIcon + '\'' +
            ", thirdIconSubtitle='" + thirdIconSubtitle + '\'' +
            '}';
    }
}
