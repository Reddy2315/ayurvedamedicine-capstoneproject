package com.wipro.ayurvedamedicine.service;

import java.util.List;

import com.wipro.ayurvedamedicine.dto.AdminDTO;
import com.wipro.ayurvedamedicine.exception.ResourceAlreadyExistsException;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;

public interface IAdminService {

	AdminDTO addAdmin(AdminDTO adminDTO) throws ResourceAlreadyExistsException;

	AdminDTO getAdminById(Long id) throws ResourceNotFoundException;

	AdminDTO updateAdmin(AdminDTO adminDTO) throws ResourceNotFoundException;

	Long deleteAdmin(Long id);

	List<AdminDTO> getAllAdmins();
}
