package com.wipro.ayurvedamedicine.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.ayurvedamedicine.entity.Admin;

public interface IAdminRepository extends JpaRepository<Admin, Long>{

	boolean existsByUserNameAndPassword(String userName, String password);
}
