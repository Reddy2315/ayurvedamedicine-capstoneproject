package com.wipro.ayurvedamedicine.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "users")
@Setter
@Getter
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public abstract class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "user_name", nullable = false)
	@NotEmpty(message = "User name is required")
	@Pattern(regexp = "^[a-zA-Z0-9_ ]+$", message = "User name must be alphanumeric, can include underscores, and spaces")
	private String userName;

	@Column(name = "user_type", nullable = false)
	@NotEmpty(message = "User type is required")
	@Pattern(regexp = "CUSTOMER|ADMIN", message = "User type must be either 'ADMIN' or 'CUSTOMER'")
	private String userType;
}
