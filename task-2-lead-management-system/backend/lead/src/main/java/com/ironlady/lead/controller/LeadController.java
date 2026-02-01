package com.ironlady.lead.controller;

import com.ironlady.lead.entity.Lead;
import com.ironlady.lead.repository.LeadRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = "http://localhost:3000")
public class LeadController {

    private final LeadRepository repository;

    public LeadController(LeadRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Lead createLead(@RequestBody Lead lead) {
        lead.setStatus("NEW");
        return repository.save(lead);
    }

    @GetMapping
    public List<Lead> getAllLeads() {
        return repository.findAll();
    }


    @DeleteMapping("/{id}")
    public void deleteLead(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Lead updateLead(@PathVariable Long id, @RequestBody Lead updatedLead) {
        Lead lead = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        lead.setName(updatedLead.getName());
        lead.setEmail(updatedLead.getEmail());
        lead.setPhone(updatedLead.getPhone());
        lead.setInterest(updatedLead.getInterest());
        lead.setStatus(updatedLead.getStatus());

        return repository.save(lead);
    }

}
