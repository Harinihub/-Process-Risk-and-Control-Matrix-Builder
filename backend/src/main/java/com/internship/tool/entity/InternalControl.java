package com.internship.tool.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "internal_controls")
public class InternalControl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String controlId;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String department;
    private String owner;
    private String status;
    private String riskLevel;
    private String controlType;
    private Integer effectivenessScore;
    private LocalDate reviewDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isDeleted = false;

    public Long getId() { return id; }
    public String getControlId() { return controlId; }
    public void setControlId(String controlId) { this.controlId = controlId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getOwner() { return owner; }
    public void setOwner(String owner) { this.owner = owner; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    public String getControlType() { return controlType; }
    public void setControlType(String controlType) { this.controlType = controlType; }
    public Integer getEffectivenessScore() { return effectivenessScore; }
    public void setEffectivenessScore(Integer effectivenessScore) { this.effectivenessScore = effectivenessScore; }
    public LocalDate getReviewDate() { return reviewDate; }
    public void setReviewDate(LocalDate reviewDate) { this.reviewDate = reviewDate; }
    public boolean isDeleted() { return isDeleted; }
    public void setDeleted(boolean deleted) { isDeleted = deleted; }
}