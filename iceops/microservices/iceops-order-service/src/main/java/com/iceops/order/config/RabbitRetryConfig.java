package com.iceops.order.config;

import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.retry.interceptor.RetryInterceptorBuilder;
import org.springframework.retry.interceptor.RetryOperationsInterceptor;

@Configuration
public class RabbitRetryConfig {

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(
            ConnectionFactory connectionFactory,
            RetryOperationsInterceptor retryInterceptor) {

        SimpleRabbitListenerContainerFactory factory =
                new SimpleRabbitListenerContainerFactory();

        factory.setConnectionFactory(connectionFactory);
        factory.setAdviceChain(retryInterceptor);

        return factory;
    }

    @Bean
    public RetryOperationsInterceptor retryInterceptor() {

        return RetryInterceptorBuilder.stateless()
                .maxAttempts(3)
                .backOffOptions(
                        1000,
                        2.0,
                        10000
                )
                .recoverer((message, cause) -> {
                    System.out.println(
                            "RabbitMQ retry failed: " + cause.getMessage()
                    );
                    return null;
                })
                .build();
    }
}