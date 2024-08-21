package com.wipro.ayurvedamedicine.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wipro.ayurvedamedicine.entity.User;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUserName(String userName);

}
