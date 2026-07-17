package com.quantik.quantikbackend.service;

import com.quantik.quantikbackend.dto.BalanceResponse;
import com.quantik.quantikbackend.entity.Gasto;
import com.quantik.quantikbackend.entity.Ingreso;
import com.quantik.quantikbackend.entity.User;
import com.quantik.quantikbackend.repository.GastoRepository;
import com.quantik.quantikbackend.repository.IngresoRepository;
import com.quantik.quantikbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BalanceService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IngresoRepository ingresoRepository;

    @Autowired
    private GastoRepository gastoRepository;

    public BalanceResponse calcularBalance(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();

        List<Ingreso> ingresos = ingresoRepository.findByUser(user);
        List<Gasto> gastos = gastoRepository.findByUser(user);

        double totalIngresos = ingresos.stream().mapToDouble(Ingreso::getMonto).sum();
        double totalGastos = gastos.stream().mapToDouble(Gasto::getMonto).sum();
        double balanceFinal = totalIngresos - totalGastos;

        return new BalanceResponse(totalIngresos, totalGastos, balanceFinal);
    }
}
