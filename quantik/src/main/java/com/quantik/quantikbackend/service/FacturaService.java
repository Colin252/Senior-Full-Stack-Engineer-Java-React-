package com.quantik.quantikbackend.service;

import com.quantik.quantikbackend.entity.Factura;
import com.quantik.quantikbackend.entity.Producto;
import com.quantik.quantikbackend.entity.ClienteEntity;
import com.quantik.quantikbackend.repository.FacturaRepository;
import com.quantik.quantikbackend.repository.ProductoRepository;
import com.quantik.quantikbackend.repository.ClienteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FacturaService {

    private final FacturaRepository facturaRepo;
    private final ProductoRepository productoRepo;
    private final ClienteRepository clienteRepo;

    public FacturaService(
            FacturaRepository facturaRepo,
            ProductoRepository productoRepo,
            ClienteRepository clienteRepo
    ) {
        this.facturaRepo = facturaRepo;
        this.productoRepo = productoRepo;
        this.clienteRepo = clienteRepo;
    }

    // Crear factura
    public Factura crearFactura(Factura f) {
        if (f.getNumero() == null || f.getNumero().isBlank()) {
            f.setNumero("F-" + System.currentTimeMillis());
        }

        if (f.getCliente() != null && f.getCliente().getId() != null) {
            ClienteEntity cliente = clienteRepo.findById(f.getCliente().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Cliente no encontrado"));
            f.setCliente(cliente);
        }

        double total = 0;
        List<Producto> productosAsociados = new ArrayList<>();

        if (f.getProductos() != null && !f.getProductos().isEmpty()) {
            for (Producto p : f.getProductos()) {
                Producto original = productoRepo.findById(p.getId())
                        .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado con id " + p.getId()));

                Producto asociado = new Producto();
                asociado.setNombre(original.getNombre());
                asociado.setPrecio(original.getPrecio());
                asociado.setCantidad(p.getCantidad() != null ? p.getCantidad() : 1);
                asociado.setFactura(f);

                total += asociado.getPrecio() * asociado.getCantidad();
                productosAsociados.add(asociado);
            }
        }

        f.setProductos(productosAsociados);
        f.setMontoTotal(total);

        return facturaRepo.save(f);
    }

    public List<Factura> listarFacturas() {
        return facturaRepo.findAll();
    }

    public Optional<Factura> obtenerFacturaPorId(Long id) {
        return facturaRepo.findById(id);
    }

    public Factura obtenerFacturaCompleta(Long id) {
        return facturaRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Factura no encontrada con id " + id));
    }

    public Factura actualizarFactura(Long id, Factura f) {
        Factura db = facturaRepo.findById(id).orElseThrow();

        if (f.getNumero() != null) db.setNumero(f.getNumero());
        if (f.getFecha() != null) db.setFecha(f.getFecha());
        if (f.getCliente() != null) db.setCliente(f.getCliente());

        // ➕ actualizar campos manuales si vienen
        if (f.getCorreoManual() != null) db.setCorreoManual(f.getCorreoManual());
        if (f.getEmpresa() != null) db.setEmpresa(f.getEmpresa());
        if (f.getDireccion() != null) db.setDireccion(f.getDireccion());
        if (f.getMetodoPago() != null) db.setMetodoPago(f.getMetodoPago());
        if (f.getNotas() != null) db.setNotas(f.getNotas());

        double total = 0;
        List<Producto> productosAsociados = new ArrayList<>();

        if (f.getProductos() != null && !f.getProductos().isEmpty()) {
            for (Producto p : f.getProductos()) {
                Producto original = productoRepo.findById(p.getId())
                        .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado con id " + p.getId()));

                Producto asociado = new Producto();
                asociado.setNombre(original.getNombre());
                asociado.setPrecio(original.getPrecio());
                asociado.setCantidad(p.getCantidad() != null ? p.getCantidad() : 1);
                asociado.setFactura(db);

                total += asociado.getPrecio() * asociado.getCantidad();
                productosAsociados.add(asociado);
            }
            db.setProductos(productosAsociados);
        }

        db.setMontoTotal(total);
        return facturaRepo.save(db);
    }

    public void eliminarFactura(Long id) {
        facturaRepo.deleteById(id);
    }
}
