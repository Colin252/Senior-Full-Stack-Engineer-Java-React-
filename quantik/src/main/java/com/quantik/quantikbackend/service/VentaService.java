package com.quantik.quantikbackend.service;

import com.quantik.quantikbackend.dto.VentaRequest;
import com.quantik.quantikbackend.dto.VentaResponse;
import com.quantik.quantikbackend.entity.Venta;
import com.quantik.quantikbackend.repository.ClienteRepository;
import com.quantik.quantikbackend.repository.ProductoRepository;
import com.quantik.quantikbackend.repository.VentaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class VentaService {

    private final VentaRepository ventaRepository;
    private final ClienteRepository clienteRepository;
    private final ProductoRepository productoRepository;

    public VentaService(VentaRepository ventaRepository,
                        ClienteRepository clienteRepository,
                        ProductoRepository productoRepository) {
        this.ventaRepository = ventaRepository;
        this.clienteRepository = clienteRepository;
        this.productoRepository = productoRepository;
    }

    @Transactional
    public VentaResponse crearVenta(VentaRequest req) {
        var cliente = clienteRepository.findById(req.getClienteId())
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado"));
        var producto = productoRepository.findById(req.getProductoId())
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));

        Venta v = new Venta();
        v.setCliente(cliente);
        v.setProducto(producto);
        v.setCantidad(req.getCantidad());
        v.setTotal(req.getTotal());
        v.setFecha(LocalDate.now());

        v = ventaRepository.save(v);
        return toResponse(v);
    }

    public List<VentaResponse> listarVentas() {
        return ventaRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public Optional<VentaResponse> obtenerVentaPorId(Long id) {
        return ventaRepository.findById(id).map(this::toResponse);
    }

    @Transactional
    public VentaResponse actualizarVenta(Long id, VentaRequest req) {
        Venta v = ventaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Venta no encontrada"));

        if (req.getClienteId() != null) {
            var cliente = clienteRepository.findById(req.getClienteId())
                    .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado"));
            v.setCliente(cliente);
        }
        if (req.getProductoId() != null) {
            var producto = productoRepository.findById(req.getProductoId())
                    .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
            v.setProducto(producto);
        }
        if (req.getCantidad() != null) v.setCantidad(req.getCantidad());
        if (req.getTotal() != null) v.setTotal(req.getTotal());

        v = ventaRepository.save(v);
        return toResponse(v);
    }

    public void eliminarVenta(Long id) {
        ventaRepository.deleteById(id);
    }

    private VentaResponse toResponse(Venta v) {
        return new VentaResponse(
                v.getId(),
                (v.getCliente() != null ? v.getCliente().getId() : null),
                (v.getCliente() != null ? v.getCliente().getNombre() : null),
                (v.getProducto() != null ? v.getProducto().getId() : null),
                (v.getProducto() != null ? v.getProducto().getNombre() : null),
                v.getCantidad(),
                v.getTotal()
        );
    }
}
