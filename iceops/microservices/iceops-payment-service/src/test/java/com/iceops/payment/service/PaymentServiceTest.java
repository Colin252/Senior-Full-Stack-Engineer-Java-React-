package com.iceops.payment.service;

import com.iceops.payment.entity.Payment;
import com.iceops.payment.repository.PaymentRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class PaymentServiceTest {

    @Mock
    private PaymentRepository repository;

    @InjectMocks
    private PaymentService paymentService;

    @Test
    void shouldReturnPaymentsList() {

        Payment payment = new Payment();

        when(repository.findAll()).thenReturn(List.of(payment));

        List<Payment> result = paymentService.getPayments();

        assertEquals(1, result.size());

        verify(repository, times(1)).findAll();
    }
}