package com.iceops.order.client;

import com.iceops.order.dto.PaymentDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ICEOPS-PAYMENT-SERVICE")
public interface PaymentClient {

    @GetMapping("/payments/{id}")
    PaymentDto getPaymentById(@PathVariable("id") Long id);

}