package com.wipro.ayurvedamedicine.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.ayurvedamedicine.dto.OrderDTO;
import com.wipro.ayurvedamedicine.dto.OrderItemDTO;
import com.wipro.ayurvedamedicine.entity.Customer;
import com.wipro.ayurvedamedicine.entity.Medicine;
import com.wipro.ayurvedamedicine.entity.Order;
import com.wipro.ayurvedamedicine.entity.OrderItem;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;
import com.wipro.ayurvedamedicine.repository.ICustomerRepository;
import com.wipro.ayurvedamedicine.repository.IMedicineRepository;
import com.wipro.ayurvedamedicine.repository.IOrderRepository;
import com.wipro.ayurvedamedicine.service.IOrderService;

import jakarta.transaction.Transactional;

@Service
public class OrderServiceImpl implements IOrderService {

	@Autowired
	private IOrderRepository orderRepository;

	@Autowired
	private ICustomerRepository customerRepository;

	@Autowired
	private IMedicineRepository medicineRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Transactional
	@Override
	public OrderDTO saveOrder(OrderDTO orderDTO) throws ResourceNotFoundException {
		Customer customer = customerRepository.findById(orderDTO.getCustomerId())
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

		Order order = modelMapper.map(orderDTO, Order.class);
		order.setCustomer(customer);
		order.setOrderDate(LocalDate.now());
		order.setStatus("Success");

		double totalAmount = 0.0;
		List<OrderItem> orderItems = new ArrayList<>();

		Set<Long> uniqueMedicineIds = new HashSet<>();

		for (OrderItemDTO itemDTO : orderDTO.getOrderItems()) {
			if (!uniqueMedicineIds.add(itemDTO.getMedicineId())) {
				throw new RuntimeException("Duplicate medicine in the order: " + itemDTO.getMedicineId());
			}

			Medicine medicine = medicineRepository.findById(itemDTO.getMedicineId())
					.orElseThrow(() -> new ResourceNotFoundException("Medicine not found"));

			double itemTotal = medicine.getPrice() * itemDTO.getQuantity();
			totalAmount += itemTotal;

			OrderItem orderItem = new OrderItem();
			orderItem.setOrder(order); // Set the order reference
			orderItem.setMedicine(medicine);
			orderItem.setQuantity(itemDTO.getQuantity());
			orderItem.setItemTotal(itemTotal);
			orderItems.add(orderItem);
		}
		order.setOrderAmount(totalAmount);
		order.setOrderItems(orderItems);

		orderRepository.save(order);

		return modelMapper.map(order, OrderDTO.class);
	}

	@Override
	public OrderDTO viewOrder(Long id) throws ResourceNotFoundException {
		Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
		return modelMapper.map(order, OrderDTO.class);
	}

	@Override
	public List<OrderDTO> getAllOrders() {
		List<Order> orders = orderRepository.findAll();
		return orders.stream().map(order -> {
			List<OrderItemDTO> orderItemDTOs = order.getOrderItems().stream()
					.map(orderItem -> new OrderItemDTO(orderItem.getId(),
							orderItem.getMedicine() != null ? orderItem.getMedicine().getId() : null, // Use medicineId
							orderItem.getQuantity(), orderItem.getItemTotal()))
					.collect(Collectors.toList());

			return new OrderDTO(order.getId(), order.getCustomer() != null ? order.getCustomer().getId() : null, 
																																																				// customerId
					order.getOrderAmount(), order.getOrderDate(), order.getStatus(), orderItemDTOs);
		}).collect(Collectors.toList());
	}

	@Override
	public OrderDTO updateOrder(OrderDTO orderDTO) throws ResourceNotFoundException {
		if (!orderRepository.existsById(orderDTO.getId())) {
			throw new ResourceNotFoundException("Order not found");
		}
		Order order = modelMapper.map(orderDTO, Order.class);
		Order updatedOrder = orderRepository.save(order);
		return modelMapper.map(updatedOrder, OrderDTO.class);
	}
	
	@Override
	public OrderDTO cancelOrder(Long orderId) throws ResourceNotFoundException {
		Order order = orderRepository.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + orderId));
		order.setStatus("Cancelled");
		Order updatedOrder = orderRepository.save(order);
		return modelMapper.map(updatedOrder, OrderDTO.class);
	}

	@Override
	public List<OrderDTO> showAllOrders(Long medicineId) {
		List<Order> orders = orderRepository.findOrdersByMedicineId(medicineId);

		return orders.stream().map(order -> {
			OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);

			List<OrderItemDTO> filteredItems = order.getOrderItems().stream()
					.filter(item -> item.getMedicine().getId().equals(medicineId))
					.map(item -> modelMapper.map(item, OrderItemDTO.class)).toList();

			orderDTO.setOrderItems(filteredItems);
			return orderDTO;
		}).toList();
	}

	@Override
	public List<OrderDTO> showAllOrdersByCustomer(Long customerId) throws ResourceNotFoundException {
		Customer customer = customerRepository.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID " + customerId));
		List<Order> orders = orderRepository.findByCustomerId(customer.getId());

		if (orders.isEmpty()) {
			throw new ResourceNotFoundException("No orders found for customer ID " + customerId);
		}
		return orders.stream().map(order -> {
			OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);
			List<OrderItemDTO> orderItemDTOs = order.getOrderItems().stream()
					.map(orderItem -> modelMapper.map(orderItem, OrderItemDTO.class)).collect(Collectors.toList());
			orderDTO.setOrderItems(orderItemDTOs);
			return orderDTO;
		}).collect(Collectors.toList());
	}

	@Override
	public List<OrderDTO> showAllOrders(LocalDate date) {
		List<Order> orders = orderRepository.findByOrderDate(date);
		return orders.stream().map(order -> modelMapper.map(order, OrderDTO.class)).toList();
	}

	@Override
	public double calculateTotalCost(Long orderId) throws ResourceNotFoundException {
		Order order = orderRepository.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order not found"));
		return order.getOrderItems().stream().mapToDouble(item -> item.getQuantity() * item.getItemTotal()).sum();
	}

}
