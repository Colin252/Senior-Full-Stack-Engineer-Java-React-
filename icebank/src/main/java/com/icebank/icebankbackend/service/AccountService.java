package com.icebank.icebankbackend.service;

import com.icebank.icebankbackend.entity.Account;
import com.icebank.icebankbackend.entity.User;
import com.icebank.icebankbackend.repository.AccountRepository;
import com.icebank.icebankbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public Account createAccount(Long userId, double initialBalance) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Account account = new Account();
        account.setUser(user);
        account.setBalance(initialBalance);
        account.setAccountNumber(generateUniqueAccountNumber());

        return accountRepository.save(account);
    }

    private String generateUniqueAccountNumber() {
        Random random = new Random();
        String number;

        do {
            number = "IBK-" + (100000 + random.nextInt(900000));
        } while (accountRepository.findByAccountNumber(number).isPresent());

        return number;
    }

    public List<Account> getAccountsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return accountRepository.findByUser(user);
    }

    public Account getByNumber(String number) {
        return accountRepository.findByAccountNumber(number)
                .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));
    }

    public Account save(Account account) {
        return accountRepository.save(account);
    }
}
