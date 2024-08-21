package com.wipro.ayurvedamedicine.service.impl;

import com.wipro.ayurvedamedicine.dto.UserDTO;
import com.wipro.ayurvedamedicine.entity.User;
import com.wipro.ayurvedamedicine.exception.ResourceNotFoundException;
import com.wipro.ayurvedamedicine.repository.IUserRepository;
import com.wipro.ayurvedamedicine.service.IUserService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;
    
    @Override
    public UserDTO addUser(UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        User newUser = userRepository.save(user);
        return modelMapper.map(newUser, UserDTO.class);
    }

    @Override
    public UserDTO updateUser(UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        User updatedUser = userRepository.save(user);
        return modelMapper.map(updatedUser, UserDTO.class);
    }

    @Override
    public Long removeUser(Long userId) throws ResourceNotFoundException {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            userRepository.delete(user.get());
            return userId;
        } else {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
    }

    @Override
    public List<UserDTO> showAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                    .map(user -> modelMapper.map(user, UserDTO.class))
                    .collect(Collectors.toList());
    }

    @Override
    public boolean validateUser(Long userId, String userName) {
        Optional<User> user = userRepository.findById(userId);
        return user.isPresent() && user.get().getUserName().equals(userName);
    }
}
