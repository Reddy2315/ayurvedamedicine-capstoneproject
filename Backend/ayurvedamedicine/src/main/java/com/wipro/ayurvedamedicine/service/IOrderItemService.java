package com.wipro.ayurvedamedicine.service;


import java.util.List;

import com.wipro.ayurvedamedicine.dto.OrderItemDTO;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;

public interface IOrderItemService {

    OrderItemDTO addOrderItem(OrderItemDTO orderItemDTO);

    OrderItemDTO viewOrderItem(Long id) throws ResourceNotFoundException;

    OrderItemDTO updateOrderItem(OrderItemDTO orderItemDTO) throws ResourceNotFoundException;

    Long deleteOrderItem(Long id) throws ResourceNotFoundException;

    List<OrderItemDTO> getOrderItemsByOrder(Long orderId);

    List<OrderItemDTO> getOrderItemsByMedicine(Long medicineId);
}

