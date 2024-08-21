package com.wipro.ayurvedamedicine.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;

    @NotEmpty(message = "User name is required")
    @Pattern(regexp = "^[a-zA-Z0-9_ ]+$", message = "User name must be alphanumeric, can include underscores, and spaces")
    private String userName;

    private String userType;
}
