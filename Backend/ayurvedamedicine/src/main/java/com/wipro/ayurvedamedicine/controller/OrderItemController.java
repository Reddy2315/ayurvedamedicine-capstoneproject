package com.wipro.ayurvedamedicine.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.ayurvedamedicine.dto.OrderItemDTO;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;
import com.wipro.ayurvedamedicine.service.IOrderItemService;

@CrossOrigin(value = "http://localhost:4200/")
@RestController
@RequestMapping("/order-items")
public class OrderItemController {

	@Autowired
	private IOrderItemService orderItemService;

	@PostMapping
	public ResponseEntity<OrderItemDTO> addOrderItem(@RequestBody OrderItemDTO orderItemDTO) {
		OrderItemDTO savedOrderItemDTO = orderItemService.addOrderItem(orderItemDTO);
		return new ResponseEntity<>(savedOrderItemDTO, HttpStatus.CREATED);
	}

	@PutMapping
	public ResponseEntity<OrderItemDTO> updateOrderItem(@RequestBody OrderItemDTO orderItemDTO)
			throws ResourceNotFoundException {
		OrderItemDTO updatedOrderItemDTO = orderItemService.updateOrderItem(orderItemDTO);
		return new ResponseEntity<>(updatedOrderItemDTO, HttpStatus.ACCEPTED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<OrderItemDTO> viewOrderItem(@PathVariable Long id) throws ResourceNotFoundException {
		OrderItemDTO orderItemDTO = orderItemService.viewOrderItem(id);
		return new ResponseEntity<>(orderItemDTO, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteOrderItem(@PathVariable Long id) throws ResourceNotFoundException {
		Long deletedId = orderItemService.deleteOrderItem(id);
		return new ResponseEntity<>("OrderItem deleted successfully with id : " + deletedId, HttpStatus.OK);
	}

	@GetMapping("/order/{orderId}")
	public ResponseEntity<List<OrderItemDTO>> getOrderItemsByOrder(@PathVariable Long orderId) {
		List<OrderItemDTO> orderItemDTOs = orderItemService.getOrderItemsByOrder(orderId);
		return new ResponseEntity<>(orderItemDTOs, HttpStatus.OK);
	}

	@GetMapping("/medicine/{medicineId}")
	public ResponseEntity<List<OrderItemDTO>> getOrderItemsByMedicine(@PathVariable Long medicineId) {
		List<OrderItemDTO> orderItemDTOs = orderItemService.getOrderItemsByMedicine(medicineId);
		return ResponseEntity.ok(orderItemDTOs);
	}
}
