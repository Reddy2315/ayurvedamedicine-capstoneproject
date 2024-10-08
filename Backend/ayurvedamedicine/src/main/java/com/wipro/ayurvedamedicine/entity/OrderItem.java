package com.wipro.ayurvedamedicine.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "order_items")
@Getter
@Setter
public class OrderItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "order_id")
	@JsonBackReference
	private Order order;

	@ManyToOne
	@JoinColumn(name = "medicine_id", nullable = false)
	@NotNull(message = "Medicine is required")
	private Medicine medicine;

	@Column(name = "quantity")
	@Min(value = 1, message = "Quantity must be at least 1")
	private Integer quantity;

	@Column(name = "item_total")
	private Double itemTotal;
}
