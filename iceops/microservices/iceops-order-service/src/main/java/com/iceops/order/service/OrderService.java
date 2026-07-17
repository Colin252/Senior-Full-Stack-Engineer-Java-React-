package com.iceops.order.service;

import com.iceops.order.client.PaymentClient;
import com.iceops.order.client.ProductClient;
import com.iceops.order.client.UserClient;
import com.iceops.order.dto.PaymentDto;
import com.iceops.order.dto.ProductDto;
import com.iceops.order.entity.Order;
import com.iceops.order.events.OrderCreatedEvent;
import com.iceops.order.publisher.OrderEventPublisher;
import com.iceops.order.repository.OrderRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import io.github.resilience4j.timelimiter.annotation.TimeLimiter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository repository;
    private final UserClient userClient;
    private final ProductClient productClient;
    private final PaymentClient paymentClient;
    private final OrderEventPublisher eventPublisher;

    public OrderService(
            OrderRepository repository,
            UserClient userClient,
            ProductClient productClient,
            PaymentClient paymentClient,
            OrderEventPublisher eventPublisher) {

        this.repository = repository;
        this.userClient = userClient;
        this.productClient = productClient;
        this.paymentClient = paymentClient;
        this.eventPublisher = eventPublisher;
    }

    public List<Order> getOrders() {
        return repository.findAll();
    }

    public Order getOrder(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Order create(Order order) {
        Order savedOrder = repository.save(order);

        OrderCreatedEvent event = new OrderCreatedEvent(
                savedOrder.getId(),
                savedOrder.getUserId()
        );

        eventPublisher.publishOrderCreated(event);

        return savedOrder;
    }

    public Order update(Long id, Order order) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setUserId(order.getUserId());
                    existing.setProductId(order.getProductId());
                    existing.setQuantity(order.getQuantity());

                    return repository.save(existing);
                })
                .orElse(null);
    }

    public boolean delete(Long id) {
        return repository.findById(id)
                .map(existing -> {
                    repository.delete(existing);
                    return true;
                })
                .orElse(false);
    }

    @Retry(name = "userServiceRetry")
    @TimeLimiter(name = "userServiceTimeout")
    @CircuitBreaker(
            name = "userServiceBreaker",
            fallbackMethod = "getUserFallback"
    )
    public Object getUser(Long userId) {
        return userClient.getUserById(userId);
    }

    public Object getUserFallback(
            Long userId,
            Throwable throwable) {

        return "User Service is currently unavailable";
    }

    @Retry(name = "productServiceRetry")
    @TimeLimiter(name = "productServiceTimeout")
    @CircuitBreaker(
            name = "productServiceBreaker",
            fallbackMethod = "getProductFallback"
    )
    public ProductDto getProduct(Long productId) {
        return productClient.getProductById(productId);
    }

    public ProductDto getProductFallback(
            Long productId,
            Throwable throwable) {

        ProductDto product = new ProductDto();
        product.setId(productId);
        product.setName("Product Service unavailable");

        return product;
    }

    @Retry(name = "paymentServiceRetry")
    @TimeLimiter(name = "paymentServiceTimeout")
    @CircuitBreaker(
            name = "paymentServiceBreaker",
            fallbackMethod = "getPaymentFallback"
    )
    public PaymentDto getPayment(Long paymentId) {
        return paymentClient.getPaymentById(paymentId);
    }

    public PaymentDto getPaymentFallback(
            Long paymentId,
            Throwable throwable) {

        PaymentDto payment = new PaymentDto();
        payment.setId(paymentId);
        payment.setStatus("Payment Service unavailable");

        return payment;
    }
}