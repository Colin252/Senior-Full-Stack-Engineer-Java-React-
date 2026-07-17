package com.iceops.payment.service;

import com.iceops.payment.entity.Payment;
import com.iceops.payment.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository repository;

    public PaymentService(PaymentRepository repository) {
        this.repository = repository;
    }

    public List<Payment> getPayments() {
        return repository.findAll();
    }

    public Payment getPayment(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Payment create(Payment payment) {
        return repository.save(payment);
    }

    public Payment update(Long id, Payment payment) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setOrderId(payment.getOrderId());
                    existing.setAmount(payment.getAmount());
                    existing.setStatus(payment.getStatus());

                    return repository.save(existing);
                })
                .orElse(null);
    }

    public boolean delete(Long id) {
        return repository.findById(id)
                .map(existing -> {
                    repository.delete(existing);
                    return true;
                })
                .orElse(false);
    }
}