package com.quantik.quantikbackend.service;

import com.quantik.quantikbackend.dto.MovimientoDto;
import com.quantik.quantikbackend.entity.Movimiento;
import com.quantik.quantikbackend.repository.MovimientoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovimientoService {

    private final MovimientoRepository repository;

    public MovimientoService(MovimientoRepository repository) {
        this.repository = repository;
    }

    public Movimiento guardarMovimiento(MovimientoDto dto) {
        Movimiento m = new Movimiento();
        m.setTipo(dto.tipo);
        m.setMonto(dto.monto);
        m.setCategoria(dto.categoria);
        m.setDescripcion(dto.descripcion);
        m.setFecha(dto.fecha);
        return repository.save(m);
    }

    public List<Movimiento> listarMovimientos() {
        return repository.findAll();
    }
}
