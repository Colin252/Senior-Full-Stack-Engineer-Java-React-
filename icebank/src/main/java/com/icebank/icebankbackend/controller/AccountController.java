package com.icebank.icebankbackend.controller;

import com.icebank.icebankbackend.entity.Account;
import com.icebank.icebankbackend.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/create")
    public ResponseEntity<?> createAccount(
            @RequestParam Long userId,
            @RequestParam double initialBalance
    ) {
        return ResponseEntity.ok(
                accountService.createAccount(userId, initialBalance)
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getAccountsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(accountService.getAccountsByUser(userId));
    }

    @GetMapping("/number/{accountNumber}")
    public ResponseEntity<?> getByNumber(@PathVariable String accountNumber) {
        return ResponseEntity.ok(accountService.getByNumber(accountNumber));
    }
}
