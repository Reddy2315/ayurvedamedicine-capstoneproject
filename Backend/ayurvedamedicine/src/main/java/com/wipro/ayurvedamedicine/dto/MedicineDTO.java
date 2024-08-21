package com.wipro.ayurvedamedicine.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MedicineDTO {

	private Long id;

	@NotEmpty(message = "Medicine name is required")
	private String name;

	@NotNull(message = "Price is required")
	@Positive(message = "Price must be a positive value")
	private Double price;

	@NotNull(message = "Manufacture date is required")
	@PastOrPresent(message = "Manufacture date must be in the past or present")
	private LocalDate mfd;

	@NotNull(message = "Expiry date is required")
	@Future(message = "Expiry date must be in the future")
	private LocalDate expiryDate;

	@NotEmpty(message = "Company name is required")
	private String companyName;

	@NotNull(message = "Category is required")
	private CategoryDTO category;
}
