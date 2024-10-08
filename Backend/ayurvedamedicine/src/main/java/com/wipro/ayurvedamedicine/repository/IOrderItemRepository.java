package com.wipro.ayurvedamedicine.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.wipro.ayurvedamedicine.entity.OrderItem;

@Repository
public interface IOrderItemRepository extends JpaRepository<OrderItem, Long> {

	List<OrderItem> findByOrderId(Long orderId);

	@Query("SELECT oi FROM OrderItem oi WHERE oi.medicine.id = :medicineId")
	List<OrderItem> findByMedicineId(@Param("medicineId") Long medicineId);

	Optional<OrderItem> findByOrderIdAndMedicineId(Long orderId, Long medicineId);

}
