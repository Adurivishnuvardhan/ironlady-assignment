package com.ironlady.ai.controller;

import com.ironlady.ai.model.AiResponse;
import com.ironlady.ai.model.UserProfile;
import com.ironlady.ai.service.OpenAiService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/career")
public class CareerController {

    private final OpenAiService openAiService;

    public CareerController(OpenAiService openAiService) {
        this.openAiService = openAiService;
    }

    @PostMapping("/guide")
    public AiResponse getGuidance(@RequestBody UserProfile profile) {
        String result = openAiService.getCareerGuidance(
                profile.getEducation(),
                profile.getExperience(),
                profile.getCareerGoal()
        );
        return new AiResponse(result);
    }
}
