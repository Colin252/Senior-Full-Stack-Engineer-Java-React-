package com.iceops.order.service;

import com.iceops.order.entity.Order;
import com.iceops.order.repository.OrderRepository;
import com.iceops.order.publisher.OrderEventPublisher;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.ArrayList;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository repository;

    @Mock
    private OrderEventPublisher eventPublisher;

    @InjectMocks
    private OrderService service;

    private Order order;

    @BeforeEach
    void setUp() {
        order = new Order();
        order.setId(1L);
    }

    @Test
    void shouldReturnOrders() {

        List<Order> orders = new ArrayList<>();
        orders.add(order);

        when(repository.findAll()).thenReturn(orders);

        List<Order> result = service.getOrders();

        assertEquals(1, result.size());

        verify(repository, times(1)).findAll();
    }

    @Test
    void shouldCreateOrder() {

        when(repository.save(order)).thenReturn(order);

        Order result = service.create(order);

        assertNotNull(result);

        verify(repository, times(1)).save(order);
        verify(eventPublisher, times(1))
                .publishOrderCreated(any());
    }
}

