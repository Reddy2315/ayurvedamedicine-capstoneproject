package com.wipro.ayurvedamedicine.service;

import java.util.List;

import com.wipro.ayurvedamedicine.dto.MedicineDTO;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;

public interface IMedicineService {

	MedicineDTO saveMedicine(MedicineDTO medicineDTO) throws ResourceNotFoundException;

	MedicineDTO updateMedicine(MedicineDTO medicineDTO) throws ResourceNotFoundException;

	MedicineDTO getMedicineById(Long id) throws ResourceNotFoundException;

	List<MedicineDTO> getAllMedicines();

	Long deleteMedicine(Long id) throws ResourceNotFoundException;

	List<MedicineDTO> getMedicinesByCategoryId(Long categoryId);

	MedicineDTO getMedicinesByName(String name) throws ResourceNotFoundException;
}
