package com.wipro.ayurvedamedicine.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wipro.ayurvedamedicine.dto.MedicineDTO;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;
import com.wipro.ayurvedamedicine.service.IMedicineService;

import java.util.List;

@CrossOrigin(value = "http://localhost:4200/")
@RestController
@RequestMapping("/medicines")
public class MedicineController {

	@Autowired
	private IMedicineService medicineService;

	@PostMapping
	public ResponseEntity<MedicineDTO> saveMedicine(@RequestBody MedicineDTO medicineDTO)
			throws ResourceNotFoundException {
		MedicineDTO savedMedicine = medicineService.saveMedicine(medicineDTO);
		return new ResponseEntity<>(savedMedicine, HttpStatus.CREATED);
	}

	@PutMapping
	public ResponseEntity<MedicineDTO> updateMedicine(@RequestBody MedicineDTO medicineDTO)
			throws ResourceNotFoundException {
		MedicineDTO updatedMedicine = medicineService.updateMedicine(medicineDTO);
		return new ResponseEntity<>(updatedMedicine, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<MedicineDTO> getMedicineById(@PathVariable Long id) throws ResourceNotFoundException {
		MedicineDTO medicine = medicineService.getMedicineById(id);
		return new ResponseEntity<>(medicine, HttpStatus.OK);
	}

	@GetMapping("/medicine/{name}")
	public ResponseEntity<MedicineDTO> getMedicineByName(@PathVariable String name) throws ResourceNotFoundException {
		MedicineDTO medicine = medicineService.getMedicinesByName(name);
		return new ResponseEntity<>(medicine, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<MedicineDTO>> getAllMedicines() {
		List<MedicineDTO> medicines = medicineService.getAllMedicines();
		return new ResponseEntity<>(medicines, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteMedicine(@PathVariable Long id) throws ResourceNotFoundException {
		Long deletedId = medicineService.deleteMedicine(id);
		return new ResponseEntity<>("Medicine deleted successfully with id : " + deletedId, HttpStatus.OK);
	}

	@GetMapping("/category/{categoryId}")
	public ResponseEntity<List<MedicineDTO>> getMedicinesByCategoryId(@PathVariable Long categoryId) {
		List<MedicineDTO> medicines = medicineService.getMedicinesByCategoryId(categoryId);
		return new ResponseEntity<>(medicines, HttpStatus.OK);
	}
}
