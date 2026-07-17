package com.quantik.quantikbackend.service;

import com.quantik.quantikbackend.entity.User;
import com.quantik.quantikbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> listar() {
        return repo.findAll();
    }

    public User crear(User u) {
        return repo.save(u);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
