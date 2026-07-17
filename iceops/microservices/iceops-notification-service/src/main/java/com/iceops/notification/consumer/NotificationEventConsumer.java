package com.iceops.notification.consumer;

import com.iceops.notification.config.RabbitMQConfig;
import com.iceops.notification.events.OrderCreatedEvent;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationEventConsumer {

    @RabbitListener(queues = RabbitMQConfig.ORDER_CREATED_QUEUE)
    public void consume(OrderCreatedEvent event) {

        System.out.println("======================================");
        System.out.println("NOTIFICATION SERVICE");
        System.out.println("Evento recibido: " + event.getEventId());
        System.out.println("Order ID: " + event.getData().getOrderId());
        System.out.println("User ID : " + event.getData().getUserId());
        System.out.println("======================================");

        // Aquí más adelante enviaremos:
        // Email
        // SMS
        // Push Notification
    }
}