package com.iceops.order;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableRabbit  // 👈 ESTE ES EL QUE FALTA
@SpringBootApplication
@EnableFeignClients
public class IceopsOrderServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(IceopsOrderServiceApplication.class, args);
    }
}