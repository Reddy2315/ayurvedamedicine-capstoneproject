package com.wipro.ayurvedamedicine.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.ayurvedamedicine.dto.CustomerDTO;
import com.wipro.ayurvedamedicine.dto.LoginDTO;
import com.wipro.ayurvedamedicine.entity.Customer;
import com.wipro.ayurvedamedicine.exception.InvalidDataException;
import com.wipro.ayurvedamedicine.exception.ResourceAlreadyExistsException;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;
import com.wipro.ayurvedamedicine.repository.ICustomerRepository;
import com.wipro.ayurvedamedicine.service.ICustomerService;

@Service
public class CustomerServiceImpl implements ICustomerService {

	@Autowired
	private ICustomerRepository customerRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public CustomerDTO saveCustomer(CustomerDTO customerDTO) throws ResourceAlreadyExistsException {
		if (customerDTO.getEmail() == null || customerDTO.getEmail().isEmpty()) {
			throw new IllegalArgumentException("Email must not be empty");
		}

		Customer customer = new Customer();
		customer.setUserType("CUSTOMER");

		boolean existsEmailOrPhNo = customerRepository.existsByEmailOrPhoneNumber(customerDTO.getEmail(),
				customerDTO.getPhoneNumber());
		boolean existsEmail=customerRepository.existsByEmail(customerDTO.getEmail());
		if (existsEmailOrPhNo || existsEmail) {
			throw new ResourceAlreadyExistsException("Customer with the given email or phone number already exists.");
		}

		customer.setUserName(customerDTO.getUserName());
		customer.setEmail(customerDTO.getEmail());
		customer.setPassword(customerDTO.getPassword());
		customer.setPhoneNumber(customerDTO.getPhoneNumber());
		customer.setAddress(customerDTO.getAddress());

		Customer savedCustomer = customerRepository.save(customer);

		CustomerDTO dto = new CustomerDTO();
		dto.setId(savedCustomer.getId());
		dto.setUserName(savedCustomer.getUserName());
		dto.setUserType(savedCustomer.getUserType());
		dto.setEmail(savedCustomer.getEmail());
		dto.setPassword(savedCustomer.getPassword());
		dto.setPhoneNumber(savedCustomer.getPhoneNumber());
		dto.setAddress(savedCustomer.getAddress());
		return dto;
	}

	@Override
	public CustomerDTO updateCustomer(CustomerDTO customerDTO) throws ResourceNotFoundException {
		Customer customer = new Customer();
		;
		if (customerDTO.getId() != null) {
			customer = customerRepository.findById(customerDTO.getId()).orElseThrow(
					() -> new ResourceNotFoundException("Customer not found with ID: " + customerDTO.getId()));
		}

		customer.setUserName(customerDTO.getUserName());
		customer.setEmail(customerDTO.getEmail());
		customer.setPassword(customerDTO.getPassword());
		customer.setPhoneNumber(customerDTO.getPhoneNumber());
		customer.setAddress(customerDTO.getAddress());
		customer.setUserType("CUSTOMER");

		Customer updatedCustomer = customerRepository.save(customer);

		return modelMapper.map(updatedCustomer, CustomerDTO.class);
	}

	@Override
	public CustomerDTO getCustomerById(Long customerId) throws ResourceNotFoundException {
		Customer customer = customerRepository.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
		return modelMapper.map(customer, CustomerDTO.class);
	}

	@Override
	public List<CustomerDTO> getAllCustomers() {
		List<Customer> customers = customerRepository.findAll();
		return customers.stream().map(customer -> modelMapper.map(customer, CustomerDTO.class))
				.collect(Collectors.toList());
	}

	public Long deleteCustomer(Long customerId) throws ResourceNotFoundException {
		Customer customer = customerRepository.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

		customerRepository.delete(customer);
		return customerId;
	}

	@Override
	public LoginDTO login(String email, String password) throws ResourceNotFoundException, InvalidDataException {
		Optional<Customer> optionalUser = customerRepository.findByEmail(email);

		if (optionalUser.isEmpty()) {
			throw new ResourceNotFoundException("User not existing");
		}

		Customer customer = optionalUser.get();

		if (!customer.getPassword().equals(password)) {
			throw new InvalidDataException("Login failed");
		}

		LoginDTO userDTO = modelMapper.map(customer, LoginDTO.class);
		return userDTO;
	}

	@Override
	public Long getCustomerIdByEmail(String email) {
		Optional<Customer> optionalUser = customerRepository.findByEmail(email);
		Customer customer = optionalUser.get();
		Long customerId = customer.getId();
		return customerId;
	}
}
