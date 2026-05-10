package com.internship.tool.controller;

import com.internship.tool.entity.InternalControl;
import com.internship.tool.repository.InternalControlRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag; 
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/controls")
@Tag(name = "Export API", description = "CSV export endpoints")
public class ExportController {

    private final InternalControlRepository repository;

    public ExportController(InternalControlRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/export")
    @Operation(summary = "Export internal controls as CSV")
    public ResponseEntity<String> exportControlsToCsv() {
        List<InternalControl> controls = repository.findAll();

        StringBuilder csv = new StringBuilder();
        csv.append("ID,Control Name,Department,Status,Risk Level\n");

        for (InternalControl control : controls) {
            csv.append(control.getId()).append(",");
            csv.append(clean(control.getTitle())).append(",");
            csv.append(clean(control.getDepartment())).append(",");
            csv.append(clean(control.getStatus())).append(",");
            csv.append(clean(control.getRiskLevel())).append("\n");
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=internal_controls.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csv.toString());
    }

    private String clean(String value) {
        if (value == null) {
            return "";
        }
        return value.replace(",", " ");
    }
}
