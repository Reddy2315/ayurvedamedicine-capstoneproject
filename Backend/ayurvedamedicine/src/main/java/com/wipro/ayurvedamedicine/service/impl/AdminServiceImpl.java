package com.wipro.ayurvedamedicine.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.ayurvedamedicine.dto.AdminDTO;
import com.wipro.ayurvedamedicine.entity.Admin;
import com.wipro.ayurvedamedicine.exception.ResourceAlreadyExistsException;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;
import com.wipro.ayurvedamedicine.repository.IAdminRepository;
import com.wipro.ayurvedamedicine.service.IAdminService;

@Service
public class AdminServiceImpl implements IAdminService {
	@Autowired
	private IAdminRepository adminRepository;

	@Autowired
	private ModelMapper modelMapper;

	public AdminDTO addAdmin(AdminDTO adminDTO) throws ResourceAlreadyExistsException {
		boolean exists = adminRepository.existsByUserNameAndPassword(adminDTO.getUserName(), adminDTO.getPassword());
		if (exists) {
			throw new ResourceAlreadyExistsException("Admin with userName and password already exists");
		}

		Admin admin = modelMapper.map(adminDTO, Admin.class);
		admin.setUserType("ADMIN");

		Admin savedAdmin = adminRepository.save(admin);

		return modelMapper.map(savedAdmin, AdminDTO.class);
	}

	public AdminDTO updateAdmin(AdminDTO adminDTO) throws ResourceNotFoundException {
		Admin admin = adminRepository.findById(adminDTO.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Admin not found with ID: " + adminDTO.getId()));

		modelMapper.map(adminDTO, admin);

		admin.setUserType("ADMIN");

		Admin updatedAdmin = adminRepository.save(admin);

		return modelMapper.map(updatedAdmin, AdminDTO.class);
	}

	@Override
	public AdminDTO getAdminById(Long id) throws ResourceNotFoundException {
		Admin admin = adminRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Admin not found"));
		return modelMapper.map(admin, AdminDTO.class);
	}

	@Override
	public Long deleteAdmin(Long id) {
		adminRepository.deleteById(id);
		return id;
	}

	@Override
	public List<AdminDTO> getAllAdmins() {
		List<Admin> admins = adminRepository.findAll();
		return admins.stream().map(admin -> modelMapper.map(admin, AdminDTO.class)).collect(Collectors.toList());
	}
}
