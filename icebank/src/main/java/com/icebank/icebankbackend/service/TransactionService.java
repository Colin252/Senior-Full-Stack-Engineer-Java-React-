package com.icebank.icebankbackend.service;

import com.icebank.icebankbackend.entity.Account;
import com.icebank.icebankbackend.entity.Transaction;
import com.icebank.icebankbackend.repository.AccountRepository;
import com.icebank.icebankbackend.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    // --------------------------
    //   TRANSFERENCIA ENTRE CUENTAS
    // --------------------------
    public void transfer(String fromNumber, String toNumber, double amount) {

        Account from = accountRepository.findByAccountNumber(fromNumber)
                .orElseThrow(() -> new RuntimeException("Cuenta de origen no encontrada"));

        Account to = accountRepository.findByAccountNumber(toNumber)
                .orElseThrow(() -> new RuntimeException("Cuenta de destino no encontrada"));

        if (from.getBalance() < amount) {
            throw new RuntimeException("Saldo insuficiente");
        }

        // Actualizar balances
        from.setBalance(from.getBalance() - amount);
        to.setBalance(to.getBalance() + amount);

        accountRepository.save(from);
        accountRepository.save(to);

        // Movimiento: DEBITO
        Transaction debit = new Transaction();
        debit.setAmount(amount);
        debit.setType("DEBIT");
        debit.setDescription("Transferencia enviada a " + toNumber);
        debit.setAccount(from);
        transactionRepository.save(debit);

        // Movimiento: CREDITO
        Transaction credit = new Transaction();
        credit.setAmount(amount);
        credit.setType("CREDIT");
        credit.setDescription("Transferencia recibida de " + fromNumber);
        credit.setAccount(to);
        transactionRepository.save(credit);
    }

    // --------------------------
    //   TRANSACCIONES POR CUENTA
    // --------------------------
    public List<Transaction> getByAccount(Long accountId) {
        return transactionRepository.findByAccountId(accountId);
    }

    // --------------------------
    //   FUNCIONES PARA FINANZAS
    // --------------------------
    public double getTotal(String tipo) {
        return transactionRepository.findAll()
                .stream()
                .filter(t -> t.getType().equalsIgnoreCase(tipo))
                .mapToDouble(Transaction::getAmount)
                .sum();
    }

    public List<Transaction> getList(String tipo) {
        return transactionRepository.findAll()
                .stream()
                .filter(t -> t.getType().equalsIgnoreCase(tipo))
                .toList();
    }

    public List<Transaction> getAll() {
        return transactionRepository.findAll();
    }
}
