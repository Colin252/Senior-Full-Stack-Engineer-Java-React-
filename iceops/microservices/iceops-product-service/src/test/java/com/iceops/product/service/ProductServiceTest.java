package com.iceops.product.service;

import com.iceops.product.entity.Product;
import com.iceops.product.repository.ProductRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository repository;

    @InjectMocks
    private ProductService productService;

    @Test
    void shouldReturnProductsList() {

        Product product = new Product();

        when(repository.findAll()).thenReturn(List.of(product));

        List<Product> result = productService.getProducts();

        assertEquals(1, result.size());

        verify(repository, times(1)).findAll();
    }
}