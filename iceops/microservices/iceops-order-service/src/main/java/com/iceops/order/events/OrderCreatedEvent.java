package com.iceops.order.events;

import java.time.Instant;
import java.util.UUID;

public class OrderCreatedEvent {

    private String eventId;
    private String eventType;
    private String version;
    private Instant timestamp;
    private String source;

    private Data data;

    public OrderCreatedEvent() {
    }

    public OrderCreatedEvent(Long orderId, Long userId) {
        this.eventId = UUID.randomUUID().toString();
        this.eventType = "order_created";
        this.version = "v1";
        this.timestamp = Instant.now();
        this.source = "order-service";
        this.data = new Data(orderId, userId);
    }

    // ✅ GETTERS IMPORTANTES
    public String getEventId() {
        return eventId;
    }

    public String getEventType() {
        return eventType;
    }

    public String getVersion() {
        return version;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public String getSource() {
        return source;
    }

    public Data getData() {
        return data;
    }

    // (setters opcionales por ahora)

    public static class Data {
        private Long orderId;
        private Long userId;

        public Data() {
        }

        public Data(Long orderId, Long userId) {
            this.orderId = orderId;
            this.userId = userId;
        }

        public Long getOrderId() {
            return orderId;
        }

        public Long getUserId() {
            return userId;
        }

        public void setOrderId(Long orderId) {
            this.orderId = orderId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }
    }
}