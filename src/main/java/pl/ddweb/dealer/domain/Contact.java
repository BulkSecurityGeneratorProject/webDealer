package pl.ddweb.dealer.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.validator.constraints.Email;
import pl.ddweb.dealer.service.validation.annotation.PhoneNumber;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * A Contact.
 */
@Entity
@Table(name = "contact")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Contact implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name1", nullable = false)
    private String name1;

    @NotNull
    @Column(name = "name2", nullable = false)
    private String name2;

    @NotNull
    @Column(name = "surname1", nullable = false)
    private String surname1;

    @NotNull
    @Column(name = "surname2", nullable = false)
    private String surname2;

    @NotNull
    @Column(name = "city", nullable = false)
    private String city;

    @NotNull
    @Column(name = "address", nullable = false)
    private String address;

    @NotNull
    @PhoneNumber
    @Column(name = "phone1", nullable = false)
    private String phone1;

    @NotNull
    @PhoneNumber
    @Column(name = "phone2", nullable = false)
    private String phone2;

    @NotNull
    @Email
    @Column(name = "email1", nullable = false)
    private String email1;

    @NotNull
    @Email
    @Column(name = "email2", nullable = false)
    private String email2;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public Contact city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public Contact address(String address) {
        this.address = address;
        return this;
    }

    public String getPhone1() {
        return phone1;
    }

    public void setPhone1(String phone1) {
        this.phone1 = phone1;
    }

    public Contact phone1(String phone1) {
        this.phone1 = phone1;
        return this;
    }

    public String getPhone2() {
        return phone2;
    }

    public void setPhone2(String phone2) {
        this.phone2 = phone2;
    }

    public Contact phone2(String phone2) {
        this.phone2 = phone2;
        return this;
    }

    public String getName1() {
        return name1;
    }

    public void setName1(String name1) {
        this.name1 = name1;
    }

    public String getName2() {
        return name2;
    }

    public void setName2(String name2) {
        this.name2 = name2;
    }

    public String getSurname1() {
        return surname1;
    }

    public void setSurname1(String surname1) {
        this.surname1 = surname1;
    }

    public String getSurname2() {
        return surname2;
    }

    public void setSurname2(String surname2) {
        this.surname2 = surname2;
    }

    public String getEmail1() {
        return email1;
    }

    public void setEmail1(String email1) {
        this.email1 = email1;
    }

    public String getEmail2() {
        return email2;
    }

    public void setEmail2(String email2) {
        this.email2 = email2;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Contact contact = (Contact) o;
        if (contact.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contact.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Contact{" +
            "id=" + id +
            ", name1='" + name1 + '\'' +
            ", name2='" + name2 + '\'' +
            ", surname1='" + surname1 + '\'' +
            ", surname2='" + surname2 + '\'' +
            ", city='" + city + '\'' +
            ", address='" + address + '\'' +
            ", phone1='" + phone1 + '\'' +
            ", phone2='" + phone2 + '\'' +
            ", email1='" + email1 + '\'' +
            ", email2='" + email2 + '\'' +
            '}';
    }

    public Contact name1(String name1) {
        this.name1 = name1;
        return this;
    }
    public Contact name2(String name2) {
        this.name2 = name2;
        return this;
    }

    public Contact surname1(String surname1) {
        this.surname1 = surname1;
        return this;
    }
    public Contact surname2(String surname2) {
        this.surname2 = surname2;
        return this;
    }

    public Contact email1(String email1) {
        this.email1 = email1;
        return this;
    }
    public Contact email2(String email2) {
        this.email2 = email2;
        return this;
    }
}
