package com.iceops.notification.service;

import com.iceops.notification.entity.Notification;
import com.iceops.notification.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository repository;

    public NotificationService(NotificationRepository repository) {
        this.repository = repository;
    }

    public List<Notification> findAll() {
        return repository.findAll();
    }

    public Notification findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Notification save(Notification notification) {
        return repository.save(notification);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}