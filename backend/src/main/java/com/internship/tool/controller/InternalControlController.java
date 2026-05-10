package com.internship.tool.controller;

import com.internship.tool.entity.InternalControl;
import com.internship.tool.repository.InternalControlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.time.LocalDate;

import java.util.List;

@RestController
@RequestMapping("/api/controls")
@CrossOrigin
public class InternalControlController {

    @Autowired
    private InternalControlRepository repository;

    // GET ALL
    @GetMapping("/all")
    public List<InternalControl> getAllControls() {
        return repository.findByIsDeletedFalse();
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
    List<InternalControl> controls = repository.findByIsDeletedFalse();

    long total = controls.size();

    long active = controls.stream()
            .filter(c -> "ACTIVE".equalsIgnoreCase(c.getStatus()))
            .count();

    long highRisk = controls.stream()
            .filter(c -> "HIGH".equalsIgnoreCase(c.getRiskLevel()))
            .count();

    double avgScore = controls.stream()
            .filter(c -> c.getEffectivenessScore() != null)
            .mapToInt(InternalControl::getEffectivenessScore)
            .average()
            .orElse(0);

    Map<String, Object> stats = new HashMap<>();
    stats.put("totalControls", total);
    stats.put("activeControls", active);
    stats.put("highRiskControls", highRisk);
    stats.put("averageScore", Math.round(avgScore));

    return stats;
}


    // CREATE
    @PostMapping("/create")
    public InternalControl createControl(@RequestBody InternalControl control) {
        return repository.save(control);
    }

    @GetMapping("/filter")
public List<InternalControl> filterControls(
        @RequestParam(required = false) String q,
        @RequestParam(required = false) String status,
        @RequestParam(required = false) String fromDate,
        @RequestParam(required = false) String toDate
) {
    LocalDate from = (fromDate == null || fromDate.isEmpty()) ? null : LocalDate.parse(fromDate);
    LocalDate to = (toDate == null || toDate.isEmpty()) ? null : LocalDate.parse(toDate);

    return repository.filterControls(q, status, from, to);
}

    @DeleteMapping("/{id}")
public String deleteControl(@PathVariable Long id) {
    InternalControl control = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Control not found"));

    control.setDeleted(true);
    repository.save(control);

    return "Deleted successfully";
}
}
