package com.internship.tool.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.commons.io.FilenameUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/files")
@Tag(name = "File Upload API", description = "Upload files with type and size validation")
public class FileUploadController {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;

    private static final List<String> ALLOWED_EXTENSIONS =
            Arrays.asList("csv", "xlsx", "pdf");

    @PostMapping("/upload")
    @Operation(summary = "Upload file with type and size validation")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty.");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            return ResponseEntity.badRequest().body("File size exceeds 5 MB limit.");
        }

        String extension = FilenameUtils.getExtension(file.getOriginalFilename());

        if (extension == null || !ALLOWED_EXTENSIONS.contains(extension.toLowerCase())) {
            return ResponseEntity.badRequest()
                    .body("Invalid file type. Only CSV, XLSX, and PDF are allowed.");
        }

        return ResponseEntity.ok("File uploaded successfully: " + file.getOriginalFilename());
    }
}