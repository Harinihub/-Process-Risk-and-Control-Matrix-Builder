package com.internship.tool.config;

import com.internship.tool.entity.InternalControl;
import com.internship.tool.repository.InternalControlRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataSeeder implements CommandLineRunner {

    private final InternalControlRepository repository;

    public DataSeeder(InternalControlRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {

        if (repository.count() > 0) {
            return;
        }

        repository.save(createControl("C001", "User Access Review", "Verify employee access permissions", "IT", "Rahul", "ACTIVE", "HIGH", "Preventive", 82, LocalDate.now().minusDays(5)));
        repository.save(createControl("C002", "Password Policy Check", "Ensure strong password policy compliance", "IT Security", "Priya", "ACTIVE", "MEDIUM", "Preventive", 78, LocalDate.now().minusDays(12)));
        repository.save(createControl("C003", "Vendor Risk Assessment", "Review vendor risk before contract renewal", "Procurement", "Anjali", "ACTIVE", "HIGH", "Detective", 74, LocalDate.now().minusDays(20)));
        repository.save(createControl("C004", "Invoice Approval Control", "Validate approvals before vendor payment", "Finance", "Kiran", "ACTIVE", "LOW", "Preventive", 90, LocalDate.now().minusDays(3)));
        repository.save(createControl("C005", "Backup Verification", "Check daily database backup completion", "IT", "Sneha", "ACTIVE", "MEDIUM", "Detective", 85, LocalDate.now().minusDays(8)));
        repository.save(createControl("C006", "Payroll Reconciliation", "Reconcile monthly payroll with attendance", "HR", "Meena", "INACTIVE", "MEDIUM", "Detective", 70, LocalDate.now().minusDays(30)));
        repository.save(createControl("C007", "Asset Inventory Review", "Validate physical assets with system records", "Operations", "Arjun", "ACTIVE", "LOW", "Detective", 88, LocalDate.now().minusDays(15)));
        repository.save(createControl("C008", "Regulatory Deadline Tracking", "Monitor upcoming compliance deadlines", "Compliance", "Divya", "ACTIVE", "HIGH", "Preventive", 76, LocalDate.now().minusDays(2)));
        repository.save(createControl("C009", "Audit Log Review", "Review system audit logs for suspicious activity", "IT Security", "Naveen", "ACTIVE", "HIGH", "Detective", 81, LocalDate.now().minusDays(18)));
        repository.save(createControl("C010", "Data Privacy Control", "Ensure sensitive customer data protection", "Compliance", "Asha", "ACTIVE", "HIGH", "Preventive", 79, LocalDate.now().minusDays(25)));
        repository.save(createControl("C011", "Budget Approval Review", "Verify department budget approval process", "Finance", "Ravi", "INACTIVE", "LOW", "Preventive", 69, LocalDate.now().minusDays(40)));
        repository.save(createControl("C012", "Change Management Control", "Validate approval before production deployment", "IT", "Varun", "ACTIVE", "MEDIUM", "Preventive", 84, LocalDate.now().minusDays(6)));
        repository.save(createControl("C013", "Employee Exit Checklist", "Ensure access removal after employee exit", "HR", "Pooja", "ACTIVE", "MEDIUM", "Preventive", 87, LocalDate.now().minusDays(10)));
        repository.save(createControl("C014", "Fraud Monitoring Review", "Monitor unusual financial transactions", "Finance", "Sanjay", "ACTIVE", "HIGH", "Detective", 73, LocalDate.now().minusDays(22)));
        repository.save(createControl("C015", "Policy Acknowledgement", "Track employee policy acknowledgement status", "Compliance", "Neha", "ACTIVE", "LOW", "Detective", 91, LocalDate.now().minusDays(1)));
    }

    private InternalControl createControl(
            String controlId,
            String title,
            String description,
            String department,
            String owner,
            String status,
            String riskLevel,
            String controlType,
            int effectivenessScore,
            LocalDate reviewDate
    ) {
        InternalControl control = new InternalControl();

        control.setControlId(controlId);
        control.setTitle(title);
        control.setDescription(description);
        control.setDepartment(department);
        control.setOwner(owner);
        control.setStatus(status);
        control.setRiskLevel(riskLevel);
        control.setControlType(controlType);
        control.setEffectivenessScore(effectivenessScore);
        control.setReviewDate(reviewDate);
        control.setDeleted(false);

        return control;
    }
}