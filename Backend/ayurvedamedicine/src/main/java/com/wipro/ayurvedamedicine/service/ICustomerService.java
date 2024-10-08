package com.wipro.ayurvedamedicine.service;

import java.util.List;

import com.wipro.ayurvedamedicine.dto.CustomerDTO;
import com.wipro.ayurvedamedicine.dto.LoginDTO;
import com.wipro.ayurvedamedicine.exception.InvalidDataException;
import com.wipro.ayurvedamedicine.exception.ResourceAlreadyExistsException;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;

public interface ICustomerService {

	CustomerDTO saveCustomer(CustomerDTO customerDTO) throws ResourceAlreadyExistsException;

	CustomerDTO updateCustomer(CustomerDTO customerDTO) throws ResourceNotFoundException;

	List<CustomerDTO> getAllCustomers();

	Long deleteCustomer(Long customerId) throws ResourceNotFoundException;

	CustomerDTO getCustomerById(Long customerId) throws ResourceNotFoundException;

	public LoginDTO login(String email, String password) throws ResourceNotFoundException, InvalidDataException;

	Long getCustomerIdByEmail(String email);
}
