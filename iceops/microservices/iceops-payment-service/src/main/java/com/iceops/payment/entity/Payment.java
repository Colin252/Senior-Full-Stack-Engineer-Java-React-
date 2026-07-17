package com.iceops.payment.entity;

import jakarta.persistence.*;

@Entity
@Table(name="payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long orderId;
    private double amount;
    private String status;

    public Payment(){}

    public Long getId(){return id;}
    public Long getOrderId(){return orderId;}
    public double getAmount(){return amount;}
    public String getStatus(){return status;}

    public void setId(Long id){this.id=id;}
    public void setOrderId(Long orderId){this.orderId=orderId;}
    public void setAmount(double amount){this.amount=amount;}
    public void setStatus(String status){this.status=status;}
}