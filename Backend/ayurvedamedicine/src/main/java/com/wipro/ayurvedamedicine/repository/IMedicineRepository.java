package com.wipro.ayurvedamedicine.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.ayurvedamedicine.entity.Medicine;

public interface IMedicineRepository extends JpaRepository<Medicine, Long> {

	 List<Medicine> findByCategoryId(Long categoryId);
	 Optional<Medicine> findByName(String name);
}
