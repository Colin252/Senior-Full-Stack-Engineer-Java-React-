package com.iceops.order.consumer;

import com.iceops.order.config.RabbitMQConfig;
import com.iceops.order.events.OrderCreatedEvent;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class OrderEventConsumer {

    @RabbitListener(
            queues = RabbitMQConfig.ORDER_CREATED_QUEUE,
            containerFactory = "rabbitListenerContainerFactory" // 🔥 IMPORTANTE
    )
    public void handleOrderCreated(OrderCreatedEvent event) {

        try {
            System.out.println("📥 Evento recibido: " + event.getEventId());

            Long orderId = event.getData().getOrderId();
            Long userId = event.getData().getUserId();

            System.out.println("Procesando Order: " + orderId + " User: " + userId);

            // 🔥 SIMULACIÓN (para probar retry + DLQ)
            if (orderId % 2 == 0) {
                throw new RuntimeException("Simulando fallo para probar retry + DLQ");
            }

        } catch (Exception e) {
            System.err.println("❌ Error procesando evento: " + event.getEventId());
            throw e; // 🔥 activa retry y luego DLQ
        }
    }
}