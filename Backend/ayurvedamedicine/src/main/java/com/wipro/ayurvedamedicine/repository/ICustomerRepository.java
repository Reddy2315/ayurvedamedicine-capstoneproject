package com.wipro.ayurvedamedicine.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wipro.ayurvedamedicine.entity.Customer;

@Repository
public interface ICustomerRepository extends JpaRepository<Customer, Long>{

	boolean existsByEmailOrPhoneNumber(String email, String phoneNumber);
	boolean existsByEmail(String email);
	Optional<Customer> findByEmailAndPhoneNumber(String email, String phoneNumber);
	Optional<Customer> findByEmail(String email);
}
