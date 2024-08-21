package com.wipro.ayurvedamedicine.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO {

	private Long id;

	@NotEmpty(message = "Category name is required")
	private String name;
}
