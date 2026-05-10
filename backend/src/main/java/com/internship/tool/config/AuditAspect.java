package com.internship.tool.config;

import com.internship.tool.entity.AuditLog;
import com.internship.tool.repository.AuditLogRepository;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Aspect
@Component
public class AuditAspect {

    private final AuditLogRepository auditLogRepository;

    public AuditAspect(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @AfterReturning("execution(* com.internship.tool.controller.InternalControlController.create*(..)) || " +
            "execution(* com.internship.tool.controller.InternalControlController.update*(..)) || " +
            "execution(* com.internship.tool.controller.InternalControlController.delete*(..))")
    public void logAudit(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();

        AuditLog auditLog = new AuditLog(
                "CUD_OPERATION",
                methodName,
                LocalDateTime.now()
        );

        auditLogRepository.save(auditLog);
    }
}
