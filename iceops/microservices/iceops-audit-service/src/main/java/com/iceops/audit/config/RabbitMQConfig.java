package com.iceops.audit.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE = "iceops.exchange";

    public static final String ORDER_CREATED_QUEUE = "order.created.queue";

    public static final String ROUTING_KEY = "order.created";

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE);
    }

    @Bean
    public Queue orderCreatedQueue() {
        return new Queue(ORDER_CREATED_QUEUE);
    }

    @Bean
    public Binding binding() {
        return BindingBuilder
                .bind(orderCreatedQueue())
                .to(exchange())
                .with(ROUTING_KEY);
    }
}