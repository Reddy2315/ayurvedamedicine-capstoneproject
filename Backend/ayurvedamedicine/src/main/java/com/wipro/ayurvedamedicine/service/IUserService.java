package com.wipro.ayurvedamedicine.service;

import java.util.List;

import com.wipro.ayurvedamedicine.dto.UserDTO;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;

public interface IUserService {

	UserDTO addUser(UserDTO userDTO);

	UserDTO updateUser(UserDTO userDTO);

	Long removeUser(Long userId) throws ResourceNotFoundException;

	List<UserDTO> showAllUsers();

	boolean validateUser(Long userId, String userName);
}
