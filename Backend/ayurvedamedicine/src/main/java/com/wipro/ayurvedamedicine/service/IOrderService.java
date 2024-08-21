package com.wipro.ayurvedamedicine.service;

import java.time.LocalDate;
import java.util.List;

import com.wipro.ayurvedamedicine.dto.OrderDTO;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;

public interface IOrderService {

	OrderDTO saveOrder(OrderDTO orderDTO) throws ResourceNotFoundException;

	OrderDTO viewOrder(Long id) throws ResourceNotFoundException;

	List<OrderDTO> getAllOrders();

	OrderDTO updateOrder(OrderDTO orderDTO) throws ResourceNotFoundException;

	OrderDTO cancelOrder(Long id) throws ResourceNotFoundException;

	List<OrderDTO> showAllOrders(Long medicineId);

	List<OrderDTO> showAllOrdersByCustomer(Long customerId) throws ResourceNotFoundException;

	List<OrderDTO> showAllOrders(LocalDate date);

	double calculateTotalCost(Long orderId) throws ResourceNotFoundException;
}
