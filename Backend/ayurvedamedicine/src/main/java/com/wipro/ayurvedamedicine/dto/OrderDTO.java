package com.wipro.ayurvedamedicine.dto;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

	private Long id;

	@NotNull(message = "Customer ID is required")
	private Long customerId;

	private double orderAmount;

	@PastOrPresent(message = "Order date must be in the past or present")
	private LocalDate orderDate;

	private String status;

	private List<OrderItemDTO> orderItems;
}
