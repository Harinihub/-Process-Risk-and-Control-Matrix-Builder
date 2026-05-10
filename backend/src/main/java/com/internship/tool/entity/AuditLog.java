package com.internship.tool.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table (name = "audit_log")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String action;
    private String methodName;
    private LocalDateTime timestamp;

    public AuditLog() {}

    public AuditLog(String action, String methodName, LocalDateTime timestamp) {
        this.action = action;
        this.methodName = methodName;
        this.timestamp = timestamp;
    }

    public Long getId() { return id; }
    public String getAction() { return action; }
    public String getMethodName() { return methodName; }
    public LocalDateTime getTimestamp() { return timestamp; }

    public void setId(Long id) { this.id = id; }
    public void setAction(String action) { this.action = action; }
    public void setMethodName(String methodName) { this.methodName = methodName; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}