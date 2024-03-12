package org.example.userdetailsproject.userservice;

import org.example.userdetailsproject.entity.UserEntity;
import org.example.userdetailsproject.exception.ResourceNotFoundException;
import org.example.userdetailsproject.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    public UserEntity updateUser(Long id, UserEntity userDetails) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id- " + id));

        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setAddress(userDetails.getAddress());
        user.setEmail(userDetails.getEmail());
        user.setDateOfBirth(userDetails.getDateOfBirth());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setStatus(userDetails.getStatus());

        final UserEntity updatedUser = userRepository.save(user);
        return updatedUser;
    }

    public void deleteUser(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id- " + id));

        userRepository.delete(user);
    }

    public UserEntity save(UserEntity user) {
        return userRepository.save(user);
    }

    public List<UserEntity> findAll() {
        return userRepository.findAll();
    }


    public List<UserEntity> findUsersByFirstName(String firstName) {
        return userRepository.findByFirstName(firstName);
    }

    public Optional<UserEntity> findUserById(Long id) {
        return userRepository.findById(id);
    }
}
