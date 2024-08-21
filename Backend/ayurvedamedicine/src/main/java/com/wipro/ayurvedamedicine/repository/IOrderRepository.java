package com.wipro.ayurvedamedicine.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.wipro.ayurvedamedicine.entity.Order;

@Repository
public interface IOrderRepository extends JpaRepository<Order, Long> {

	List<Order> findByCustomerId(Long customerId);

	List<Order> findByOrderDate(LocalDate date);

	@Query("SELECT o FROM Order o JOIN o.orderItems oi WHERE oi.medicine.id = :medicineId")
	List<Order> findOrdersByMedicineId(@Param("medicineId") Long medicineId);
}
