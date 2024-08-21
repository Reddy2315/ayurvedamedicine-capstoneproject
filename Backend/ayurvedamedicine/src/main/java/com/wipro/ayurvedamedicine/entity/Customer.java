package com.wipro.ayurvedamedicine.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="customers")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Customer extends User {

    @Column(name = "email", nullable = false, unique = true)
    @Email(message = "Email should be valid")
    @NotEmpty(message = "Email is required")
    private String email;

    @Column(name = "password", nullable = false)
    @Size(min = 6, message = "Password should be at least 6 characters long")
    @NotEmpty(message = "Password is required")
    private String password;

    @Column(name = "phone_number", nullable = false)
    @NotEmpty(message = "Phone number is required")
    private String phoneNumber;

    @Column(name = "address", nullable = false)
    @NotEmpty(message = "Address is required")
    private String address;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Order> orders;
}
