package com.iceops.audit.consumer;

import com.iceops.audit.config.RabbitMQConfig;
import com.iceops.audit.events.OrderCreatedEvent;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class AuditEventConsumer {

    @RabbitListener(queues = RabbitMQConfig.ORDER_CREATED_QUEUE)
    public void consume(OrderCreatedEvent event) {

        System.out.println("======================================");
        System.out.println("AUDIT SERVICE");
        System.out.println("Evento recibido: " + event.getEventId());
        System.out.println("Order ID: " + event.getData().getOrderId());
        System.out.println("User ID : " + event.getData().getUserId());
        System.out.println("======================================");

        // Aquí posteriormente registraremos auditoría
        // (usuario, fecha, acción, IP, etc.).
    }
}