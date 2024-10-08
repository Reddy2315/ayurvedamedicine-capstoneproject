package com.wipro.ayurvedamedicine.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.ayurvedamedicine.dto.OrderItemDTO;
import com.wipro.ayurvedamedicine.entity.Medicine;
import com.wipro.ayurvedamedicine.entity.OrderItem;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;
import com.wipro.ayurvedamedicine.repository.IMedicineRepository;
import com.wipro.ayurvedamedicine.repository.IOrderItemRepository;
import com.wipro.ayurvedamedicine.service.IOrderItemService;

@Service
public class OrderItemServiceImpl implements IOrderItemService {

	@Autowired
	private IOrderItemRepository orderItemRepository;

	@Autowired
	private IMedicineRepository medicineRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public OrderItemDTO addOrderItem(OrderItemDTO orderItemDTO) {

		OrderItem orderItem = modelMapper.map(orderItemDTO, OrderItem.class);

		Medicine medicine = medicineRepository.findById(orderItemDTO.getMedicineId())
				.orElseThrow(() -> new RuntimeException("Medicine not found"));

		double itemTotal = medicine.getPrice() * orderItemDTO.getQuantity();
		orderItem.setItemTotal(itemTotal); // Set the item total in the entity

		orderItem = orderItemRepository.save(orderItem);

		return modelMapper.map(orderItem, OrderItemDTO.class);
	}

	@Override
	public OrderItemDTO viewOrderItem(Long id) throws ResourceNotFoundException {
		OrderItem orderItem = orderItemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Order Item not found"));

		return modelMapper.map(orderItem, OrderItemDTO.class);

	}

	@Override
	public OrderItemDTO updateOrderItem(OrderItemDTO orderItemDTO) throws ResourceNotFoundException {
		OrderItem existingOrderItem = orderItemRepository.findById(orderItemDTO.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Order Item not found"));

		OrderItem orderItem = orderItemRepository.save(existingOrderItem);

		return modelMapper.map(orderItem, OrderItemDTO.class);
	}

	@Override
	public Long deleteOrderItem(Long id) throws ResourceNotFoundException {
		if (!orderItemRepository.existsById(id)) {
			throw new ResourceNotFoundException("Order Item not found");
		}
		orderItemRepository.deleteById(id);
		return id;
	}

	@Override
	public List<OrderItemDTO> getOrderItemsByOrder(Long orderId) {
		return orderItemRepository.findByOrderId(orderId).stream()
				.map(orderItem -> modelMapper.map(orderItem, OrderItemDTO.class)).collect(Collectors.toList());
	}

	@Override
	public List<OrderItemDTO> getOrderItemsByMedicine(Long medicineId) {
		List<OrderItem> orderItems = orderItemRepository.findByMedicineId(medicineId);
		return orderItems.stream().map(orderItem -> modelMapper.map(orderItem, OrderItemDTO.class))
				.collect(Collectors.toList());
	}
}
