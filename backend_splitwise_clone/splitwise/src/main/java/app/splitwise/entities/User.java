package app.splitwise.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User extends BaseEntity {

    private String name;

    @Column(unique = true)
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

}
