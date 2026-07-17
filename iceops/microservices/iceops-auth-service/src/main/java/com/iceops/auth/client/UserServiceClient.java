package com.iceops.auth.client;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "ICEOPS-USER-SERVICE")
public interface UserServiceClient {

}