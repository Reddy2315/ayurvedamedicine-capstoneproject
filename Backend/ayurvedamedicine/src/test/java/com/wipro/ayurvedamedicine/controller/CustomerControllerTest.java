package com.wipro.ayurvedamedicine.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.wipro.ayurvedamedicine.dto.CustomerDTO;
import com.wipro.ayurvedamedicine.dto.LoginDTO;
import com.wipro.ayurvedamedicine.service.ICustomerService;

@WebMvcTest(CustomerController.class)
public class CustomerControllerTest {

	@MockBean
	private ICustomerService customerService;

	@Autowired
	MockMvc mockMvc;

	@Test
	public void testAddCustomer() throws Exception {

		CustomerDTO savedCustomerDTO = new CustomerDTO(1L, "Reddy", "CUSTOMER", "reddy@gmail.com", "reddy123",
				"9876543210", "1-11");

		when(customerService.saveCustomer(any(CustomerDTO.class))).thenReturn(savedCustomerDTO);

		mockMvc.perform(post("/customer").contentType("application/json").content(
				"{ \"userName\": \"Reddy\", \"userType\": \"CUSTOMER\", \"email\": \"reddy@gmail.com\", \"password\": \"reddy123\", \"phoneNumber\": \"9876543210\", \"address\": \"1-11\" }"))
				.andExpect(status().isCreated()).andExpect(jsonPath("$.id").value(1))
				.andExpect(jsonPath("$.userName").value("Reddy"))
				.andExpect(jsonPath("$.email").value("reddy@gmail.com"));
	}

	@Test
	public void testGetAllCustomers() throws Exception {

		CustomerDTO customer1 = new CustomerDTO(1L, "Reddy", "CUSTOMER", "reddy@gmail.com", "reddy123", "9876543210",
				"1-11");
		CustomerDTO customer2 = new CustomerDTO(1L, "Reddy", "CUSTOMER", "ram@gmail.com", "ram123", "9876543210",
				"1-11");
		List<CustomerDTO> customers = Arrays.asList(customer1, customer2);

		when(customerService.getAllCustomers()).thenReturn(customers);

		mockMvc.perform(get("/customer")).andExpect(status().isOk()).andExpect(jsonPath("$", Matchers.hasSize(2)))
				.andExpect(jsonPath("$[0].email", Matchers.is("reddy@gmail.com")))
				.andExpect(jsonPath("$[0].password", Matchers.is("reddy123")))
				.andExpect(jsonPath("$[1].email", Matchers.is("ram@gmail.com")))
				.andExpect(jsonPath("$[1].password", Matchers.is("ram123")));
	}

	@Test
	public void testFetchCustomerDetails() throws Exception {

		Long id = 1L;

		CustomerDTO customerDTO = new CustomerDTO(1L, "Reddy", "CUSTOMER", "reddy@gmail.com", "reddy123", "9876543210",
				"1-11");

		when(customerService.getCustomerById(id)).thenReturn(customerDTO);

		mockMvc.perform(get("/customer/{id}", id)).andExpect(status().isOk()).andExpect(jsonPath("$.id").value(id))
				.andExpect(jsonPath("$.userName").value(customerDTO.getUserName()))
				.andExpect(jsonPath("$.password").value(customerDTO.getPassword()))
				.andExpect(jsonPath("$.phoneNumber").value(customerDTO.getPhoneNumber()))
				.andExpect(jsonPath("$.address").value(customerDTO.getAddress())).andDo(print());
	}

	@Test
	public void testUpdateCustomer() throws Exception {
		Long customerId = 1L;
		CustomerDTO updatedCustomerDTO = new CustomerDTO(customerId, "Reddy Updated", "CUSTOMER", "reddy@gmail.com",
				"reddy123", "9876543210", "1-11");

		when(customerService.updateCustomer(any(CustomerDTO.class))).thenReturn(updatedCustomerDTO);

		mockMvc.perform(put("/customer").contentType("application/json").content(
				"{ \"id\": 1, \"userName\": \"Reddy Updated\", \"userType\": \"CUSTOMER\", \"email\": \"reddy@gmail.com\", \"password\": \"reddy123\", \"phoneNumber\": \"9876543210\", \"address\": \"1-11\" }"))
				.andExpect(status().isAccepted()).andExpect(jsonPath("$.id").value(updatedCustomerDTO.getId()))
				.andExpect(jsonPath("$.userName").value(updatedCustomerDTO.getUserName()))
				.andExpect(jsonPath("$.email").value(updatedCustomerDTO.getEmail()));
	}

	@Test
	public void testDeleteCustomer() throws Exception {
		Long customerId = 1L;

		when(customerService.deleteCustomer(customerId)).thenReturn(customerId);

		mockMvc.perform(delete("/customer/{id}", customerId)).andExpect(status().isOk())
				.andExpect(content().string("Customer deleted successfully with id : " + customerId));
	}

	@Test
	public void testCustomerLogin() throws Exception {
		String email = "reddy@gmail.com";
		String password = "reddy123";
		LoginDTO loginDTO = new LoginDTO(email, password);

		when(customerService.login(email, password)).thenReturn(loginDTO);

		mockMvc.perform(post("/customer/login").contentType("application/json")
				.content("{ \"email\": \"" + email + "\", \"password\": \"" + password + "\" }"))
				.andExpect(status().isOk()).andExpect(jsonPath("$.email").value(email))
				.andExpect(jsonPath("$.password").value(password));
	}

}
