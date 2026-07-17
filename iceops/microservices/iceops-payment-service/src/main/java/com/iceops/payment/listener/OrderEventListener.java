package com.iceops.payment.listener;

import com.iceops.payment.events.OrderCreatedEvent;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class OrderEventListener {

    @RabbitListener(queues = "order.created.queue")
    public void handleOrderCreated(OrderCreatedEvent event) {

        System.out.println("Payment service received order event: " + event.getOrderId());

        // aquí podrías procesar el pago
    }
}