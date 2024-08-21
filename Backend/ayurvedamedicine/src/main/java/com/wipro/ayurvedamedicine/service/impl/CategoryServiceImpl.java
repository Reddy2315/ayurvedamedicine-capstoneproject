package com.wipro.ayurvedamedicine.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.ayurvedamedicine.dto.CategoryDTO;
import com.wipro.ayurvedamedicine.entity.Category;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;
import com.wipro.ayurvedamedicine.repository.ICategoryRepository;
import com.wipro.ayurvedamedicine.service.ICategoryService;

@Service
public class CategoryServiceImpl implements ICategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CategoryDTO saveCategory(CategoryDTO categoryDTO) {
        Category category = modelMapper.map(categoryDTO, Category.class);
        Category savedCategory = categoryRepository.save(category);
        return modelMapper.map(savedCategory, CategoryDTO.class);
    }

    @Override
    public CategoryDTO updateCategory(CategoryDTO categoryDTO) throws ResourceNotFoundException {
        if (!categoryRepository.existsById(categoryDTO.getId())) {
            throw new ResourceNotFoundException("Category not found with id: " + categoryDTO.getId());
        }
        Category category = modelMapper.map(categoryDTO, Category.class);
        Category updatedCategory = categoryRepository.save(category);
        return modelMapper.map(updatedCategory, CategoryDTO.class);
    }

    @Override
    public CategoryDTO getCategoryById(Long id) throws ResourceNotFoundException {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        return modelMapper.map(category, CategoryDTO.class);
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(category -> modelMapper.map(category, CategoryDTO.class))
                .collect(Collectors.toList());
    }



    @Override
    public Long deleteCategory(Long id) throws ResourceNotFoundException {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
        return id;
    }
    
}
