package com.wipro.ayurvedamedicine.service;

import java.util.List;

import com.wipro.ayurvedamedicine.dto.CategoryDTO;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;

public interface ICategoryService {

	CategoryDTO saveCategory(CategoryDTO categoryDTO);

	CategoryDTO updateCategory(CategoryDTO categoryDTO) throws ResourceNotFoundException;

	CategoryDTO getCategoryById(Long id) throws ResourceNotFoundException;

	List<CategoryDTO> getAllCategories();

	Long deleteCategory(Long id) throws ResourceNotFoundException;
}
