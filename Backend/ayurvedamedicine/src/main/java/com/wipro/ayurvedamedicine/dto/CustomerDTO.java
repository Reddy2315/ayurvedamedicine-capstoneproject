package com.wipro.ayurvedamedicine.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CustomerDTO extends UserDTO {

	@Email(message = "Email should be valid")
	@NotEmpty(message = "Email is required")
	private String email;

	@Size(min = 6, message = "Password should be at least 6 characters long")
	@NotEmpty(message = "Password is required")
	private String password;

	@NotEmpty(message = "Phone number is required")
	private String phoneNumber;

	@NotEmpty(message = "Address is required")
	private String address;

	public CustomerDTO(Long id, String userName, String userType, String email, String password, String phoneNumber,
			String address) {
		super(id, userName, userType);
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.address = address;
	}
}
