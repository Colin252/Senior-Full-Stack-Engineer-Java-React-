package com.iceops.analytics.consumer;

import com.iceops.analytics.config.RabbitMQConfig;
import com.iceops.analytics.events.OrderCreatedEvent;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class AnalyticsEventConsumer {

    @RabbitListener(queues = RabbitMQConfig.ORDER_CREATED_QUEUE)
    public void consume(OrderCreatedEvent event) {

        System.out.println("======================================");
        System.out.println("ANALYTICS SERVICE");
        System.out.println("Order Event Received");
        System.out.println(event);
        System.out.println("======================================");

    }

}