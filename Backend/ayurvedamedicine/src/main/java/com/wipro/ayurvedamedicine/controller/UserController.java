package com.wipro.ayurvedamedicine.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.ayurvedamedicine.dto.UserDTO;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;
import com.wipro.ayurvedamedicine.service.IUserService;

import jakarta.validation.Valid;

@CrossOrigin(value = "http://localhost:4200/")
@RestController
@RequestMapping("/users")
@Validated
public class UserController {

	@Autowired
	private IUserService userService;

	@PostMapping
	public ResponseEntity<UserDTO> addUser(@RequestBody @Valid UserDTO userDTO) {
		UserDTO newUser = userService.addUser(userDTO);
		return new ResponseEntity<>(newUser, HttpStatus.CREATED);
	}

	@PutMapping
	public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDTO) {
		UserDTO updatedUser = userService.updateUser(userDTO);
		return new ResponseEntity<>(updatedUser, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/{userId}")
	public ResponseEntity<String> removeUser(@PathVariable Long userId) throws ResourceNotFoundException {
		Long deletedId = userService.removeUser(userId);
		return new ResponseEntity<>("User removed successfully with id : " + deletedId, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<UserDTO>> showAllUsers() {
		List<UserDTO> users = userService.showAllUsers();
		return new ResponseEntity<>(users, HttpStatus.OK);
	}

	@GetMapping("/validate")
	public ResponseEntity<Boolean> validateUser(@RequestParam Long userId, @RequestParam String userName) {
		boolean isValid = userService.validateUser(userId, userName);
		return new ResponseEntity<>(isValid, HttpStatus.OK);
	}

}
