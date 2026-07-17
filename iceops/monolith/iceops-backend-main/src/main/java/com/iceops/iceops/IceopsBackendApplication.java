package com.iceops.iceops;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.iceops")
public class IceopsBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(IceopsBackendApplication.class, args);
    }

}