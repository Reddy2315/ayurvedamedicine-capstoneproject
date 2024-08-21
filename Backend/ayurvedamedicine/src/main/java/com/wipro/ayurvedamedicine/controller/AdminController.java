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
import org.springframework.web.bind.annotation.RestController;

import com.wipro.ayurvedamedicine.dto.AdminDTO;
import com.wipro.ayurvedamedicine.exception.ResourceAlreadyExistsException;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;
import com.wipro.ayurvedamedicine.service.IAdminService;

import jakarta.validation.Valid;

@CrossOrigin(value = "http://localhost:4200/")
@RestController
@RequestMapping("/admin")
@Validated
public class AdminController {

	@Autowired
	private IAdminService adminService;

	@PostMapping
	public ResponseEntity<AdminDTO> createAdmin(@Valid @RequestBody AdminDTO adminDTO)
			throws ResourceAlreadyExistsException {
		AdminDTO createdAdmin = adminService.addAdmin(adminDTO);
		return new ResponseEntity<>(createdAdmin, HttpStatus.CREATED);
	}

	@PutMapping
	public ResponseEntity<AdminDTO> updateAdmin(@Valid @RequestBody AdminDTO adminDTO)
			throws ResourceNotFoundException {
		AdminDTO updatedAdmin = adminService.updateAdmin(adminDTO);
		return new ResponseEntity<>(updatedAdmin, HttpStatus.ACCEPTED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<AdminDTO> getAdminById(@PathVariable Long id) throws ResourceNotFoundException {
		AdminDTO adminDTO = adminService.getAdminById(id);
		return new ResponseEntity<>(adminDTO, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<AdminDTO>> getAllAdmins() {
		List<AdminDTO> adminDTO = adminService.getAllAdmins();
		return new ResponseEntity<>(adminDTO, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteAdmin(@PathVariable Long id) {
		Long deletedId = adminService.deleteAdmin(id);
		return new ResponseEntity<>("Admin deleted successfully with id : " + deletedId, HttpStatus.OK);
	}

}