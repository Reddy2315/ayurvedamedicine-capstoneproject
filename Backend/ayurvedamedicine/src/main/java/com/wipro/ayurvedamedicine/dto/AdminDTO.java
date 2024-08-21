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
public class AdminDTO extends UserDTO {

	private Long id;

	@Email(message = "Email should be valid")
	@NotEmpty(message = "Email is required")
	private String email;

	@Size(min = 6, message = "Password should be at least 6 characters long")
	@NotEmpty(message = "Password is required")
	private String password;

	public AdminDTO(Long id, String userName, String userType, String email, String password) {
		super(id, userName, userType);
		this.email = email;
		this.password = password;
	}

}
