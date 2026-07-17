package com.icebank.icebankbackend.controller;

import com.icebank.icebankbackend.dto.TransferRequest;
import com.icebank.icebankbackend.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping("/transfer")
    public ResponseEntity<?> transfer(@RequestBody TransferRequest request) {
        try {
            transactionService.transfer(
                    request.getFrom(),
                    request.getTo(),
                    request.getAmount()
            );
            return ResponseEntity.ok("Transferencia realizada correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<?> getByAccount(@PathVariable Long accountId) {
        return ResponseEntity.ok(transactionService.getByAccount(accountId));
    }
}
