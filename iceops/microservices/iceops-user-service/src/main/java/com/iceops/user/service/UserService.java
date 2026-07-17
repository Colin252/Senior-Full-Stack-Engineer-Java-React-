package com.iceops.user.service;

import com.iceops.user.entity.UserEntity;
import com.iceops.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<UserEntity> getUsers() {
        return repository.findAll();
    }

    public UserEntity getUser(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));
    }

    public UserEntity createUser(UserEntity user) {
        user.setId(null);
        return repository.save(user);
    }

    public UserEntity updateUser(Long id, UserEntity updatedUser) {
        UserEntity existingUser = getUser(id);

        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setEmail(updatedUser.getEmail());

        return repository.save(existingUser);
    }

    public void deleteUser(Long id) {
        UserEntity existingUser = getUser(id);
        repository.delete(existingUser);
    }
}