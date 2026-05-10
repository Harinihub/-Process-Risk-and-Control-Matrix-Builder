package com.internship.tool.repository;

import com.internship.tool.entity.InternalControl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface InternalControlRepository extends JpaRepository<InternalControl, Long> {

    List<InternalControl> findByIsDeletedFalse();

    @Query("SELECT c FROM InternalControl c WHERE c.isDeleted = false AND " +
            "(LOWER(c.title) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
            "LOWER(c.department) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
            "LOWER(c.owner) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
            "LOWER(c.controlId) LIKE LOWER(CONCAT('%', :q, '%')))")
    List<InternalControl> searchControls(@Param("q") String q);

    @Query("SELECT c FROM InternalControl c WHERE c.isDeleted = false " +
            "AND (:q IS NULL OR :q = '' OR " +
            "LOWER(c.title) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
            "LOWER(c.department) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
            "LOWER(c.owner) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
            "LOWER(c.controlId) LIKE LOWER(CONCAT('%', :q, '%'))) " +
            "AND (:status IS NULL OR :status = '' OR c.status = :status) " +
            "AND (:fromDate IS NULL OR c.reviewDate >= :fromDate) " +
            "AND (:toDate IS NULL OR c.reviewDate <= :toDate)")
    List<InternalControl> filterControls(
            @Param("q") String q,
            @Param("status") String status,
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate
    );
}