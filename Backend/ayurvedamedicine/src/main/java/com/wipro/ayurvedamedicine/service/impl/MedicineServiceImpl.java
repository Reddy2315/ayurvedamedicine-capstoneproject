package com.wipro.ayurvedamedicine.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.ayurvedamedicine.dto.MedicineDTO;
import com.wipro.ayurvedamedicine.entity.Category;
import com.wipro.ayurvedamedicine.entity.Medicine;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;
import com.wipro.ayurvedamedicine.repository.ICategoryRepository;
import com.wipro.ayurvedamedicine.repository.IMedicineRepository;
import com.wipro.ayurvedamedicine.service.IMedicineService;

import jakarta.transaction.Transactional;

@Service
public class MedicineServiceImpl implements IMedicineService {

	@Autowired
	private IMedicineRepository medicineRepository;

	@Autowired
	private ICategoryRepository categoryRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public MedicineDTO saveMedicine(MedicineDTO medicineDTO) {

		Medicine medicine = modelMapper.map(medicineDTO, Medicine.class);

		if (medicine.getCategory().getId() == null) {

			categoryRepository.save(medicine.getCategory());
		} else {
			Category existingCategory = categoryRepository.findById(medicine.getCategory().getId()).orElseThrow(
					() -> new IllegalArgumentException("Invalid category ID: " + medicine.getCategory().getId()));

			medicine.setCategory(existingCategory);
		}
		medicineRepository.save(medicine);

		return modelMapper.map(medicine, MedicineDTO.class);
	}

	@Transactional
	@Override
	public MedicineDTO updateMedicine(MedicineDTO medicineDTO) throws ResourceNotFoundException {
		if (!medicineRepository.existsById(medicineDTO.getId())) {
			throw new ResourceNotFoundException("Medicine not found with id: " + medicineDTO.getId());
		}

		Medicine medicine = modelMapper.map(medicineDTO, Medicine.class);

		Category category = categoryRepository.findById(medicineDTO.getCategory().getId())
				.orElseThrow(() -> new ResourceNotFoundException(
						"Category not found with id: " + medicineDTO.getCategory().getId()));

		medicine.setCategory(category);
		Medicine updatedMedicine = medicineRepository.save(medicine);
		return modelMapper.map(updatedMedicine, MedicineDTO.class);
	}

	@Override
	public MedicineDTO getMedicineById(Long id) throws ResourceNotFoundException {
		Medicine medicine = medicineRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Medicine not found with id: " + id));
		return modelMapper.map(medicine, MedicineDTO.class);
	}

	@Override
	public List<MedicineDTO> getAllMedicines() {
		return medicineRepository.findAll().stream().map(medicine -> modelMapper.map(medicine, MedicineDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public Long deleteMedicine(Long id) throws ResourceNotFoundException {
		if (!medicineRepository.existsById(id)) {
			throw new ResourceNotFoundException("Medicine not found with id: " + id);
		}
		medicineRepository.deleteById(id);
		return id;
	}

	@Override
	public List<MedicineDTO> getMedicinesByCategoryId(Long categoryId) {
		List<Medicine> medicines = medicineRepository.findByCategoryId(categoryId);
		return medicines.stream().map(medicine -> modelMapper.map(medicine, MedicineDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public MedicineDTO getMedicinesByName(String name) throws ResourceNotFoundException {
		Optional<Medicine> medicineDetils = medicineRepository.findByName(name);
		if (medicineDetils.isEmpty()) {
			throw new ResourceNotFoundException("Medicines not found with name : " + name);
		}
		Medicine medicines = medicineDetils.get();

		return modelMapper.map(medicines, MedicineDTO.class);
	}
}
