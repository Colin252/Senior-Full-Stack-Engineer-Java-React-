package com.iceops.payment.events;

public class OrderCreatedEvent {

    private Long orderId;
    private Long userId;

    public OrderCreatedEvent() {}

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