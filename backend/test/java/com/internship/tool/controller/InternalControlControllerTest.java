package com.example.backend.controller;

import com.example.backend.model.InternalControl;
import com.example.backend.repository.InternalControlRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class InternalControlControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private InternalControlRepository repository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllControls() throws Exception {
        mockMvc.perform(get("/api/controls/all"))
                .andExpect(status().isOk());
    }

    @Test
    void testCreateControl() throws Exception {
        InternalControl control = new InternalControl();
        control.setControlName("Access Control Review");
        control.setDepartment("IT");
        control.setStatus("Pending");
        control.setRiskLevel("High");

        mockMvc.perform(post("/api/controls")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(control)))
                .andExpect(status().isCreated());
    }

    @Test
    void testGetControlById() throws Exception {
        InternalControl control = new InternalControl();
        control.setControlName("Data Backup Check");
        control.setDepartment("IT");
        control.setStatus("Completed");
        control.setRiskLevel("Medium");

        InternalControl saved = repository.save(control);

        mockMvc.perform(get("/api/controls/" + saved.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.controlName").value("Data Backup Check"));
    }

    @Test
    void testUpdateControl() throws Exception {
        InternalControl control = new InternalControl();
        control.setControlName("Old Control");
        control.setDepartment("Finance");
        control.setStatus("Pending");
        control.setRiskLevel("Low");

        InternalControl saved = repository.save(control);

        saved.setControlName("Updated Control");
        saved.setStatus("Completed");

        mockMvc.perform(put("/api/controls/" + saved.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(saved)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.controlName").value("Updated Control"));
    }

    @Test
    void testDeleteControl() throws Exception {
        InternalControl control = new InternalControl();
        control.setControlName("Delete Test Control");
        control.setDepartment("Audit");
        control.setStatus("Pending");
        control.setRiskLevel("High");

        InternalControl saved = repository.save(control);

        mockMvc.perform(delete("/api/controls/" + saved.getId()))
                .andExpect(status().isOk());
    }

    @Test
    void testSearchControls() throws Exception {
        mockMvc.perform(get("/api/controls/search")
                        .param("q", "IT"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetStats() throws Exception {
        mockMvc.perform(get("/api/controls/stats"))
                .andExpect(status().isOk());
    }

    @Test
    void testInvalidControlIdReturnsNotFound() throws Exception {
        mockMvc.perform(get("/api/controls/999999"))
                .andExpect(status().isNotFound());
    }
}