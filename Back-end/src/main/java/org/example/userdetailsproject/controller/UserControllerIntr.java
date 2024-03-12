package org.example.userdetailsproject.controller;


import org.example.userdetailsproject.userservice.*;
import org.example.userdetailsproject.entity.UserEntity;
import org.example.userdetailsproject.exception.ResourceNotFoundException;
import org.example.userdetailsproject.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/userdetails")
public class UserControllerIntr {

    @Autowired
    UserRepo userrepo;

    @Autowired
    UserService userService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(){
        List<UserEntity> users = new ArrayList<>();
        users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @PostMapping("/createuser")
    public ResponseEntity<UserEntity> createUser(@RequestBody UserEntity user){

        UserEntity createdUser = userService.save(user);
        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }
    @PutMapping("/users/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable Long id, @RequestBody UserEntity userDetails) {
        UserEntity updatedUser = userService.updateUser(id, userDetails);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/users/search/byFirstName")
    public ResponseEntity<List<UserEntity>> findUsersByFirstName(@RequestParam String firstName) {
        List<UserEntity> users = userService.findUsersByFirstName(firstName);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<List<UserEntity>> findUserById(@PathVariable Long id) {
        UserEntity user = userService.findUserById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id: " + id));
        List<UserEntity> users = new ArrayList<>();
        users.add(user);
        return ResponseEntity.ok(users);
    }

}
