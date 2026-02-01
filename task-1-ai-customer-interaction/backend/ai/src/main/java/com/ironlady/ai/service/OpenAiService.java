package com.ironlady.ai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class OpenAiService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final WebClient webClient = WebClient.create("https://api.openai.com/v1/chat/completions");

    public String getCareerGuidance(String education, String experience, String goal) {

        try {
            String prompt = """
        You are an AI career advisor for Iron Lady, a women-focused
        technology and leadership platform.

        Based on the user profile, recommend the most suitable
        Iron Lady program. Explain why, expected outcomes,
        and the next step.

        User Profile:
        Education: %s
        Experience: %s
        Career Goal: %s
        """.formatted(education, experience, goal);

            Map<String, Object> requestBody = Map.of(
                    "model", "gpt-3.5-turbo",
                    "messages", new Object[]{
                            Map.of("role", "user", "content", prompt)
                    }
            );

            return webClient.post()
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .map(response -> {
                        var choices = (java.util.List<Map<String, Object>>) response.get("choices");
                        var message = (Map<String, Object>) choices.get(0).get("message");
                        return message.get("content").toString();
                    })
                    .block();

        } catch (Exception e) {
            // ✅ FALLBACK – ALWAYS RETURN SOMETHING
            return getFallbackResponse(education, experience, goal);
        }
    }


    private String getFallbackResponse(String education, String experience, String goal) {

        String goalLower = goal.toLowerCase().trim();

        String recommendedPath;

        if (goalLower.contains("ai")
                || goalLower.contains("machine")
                || goalLower.contains("ml")
                || goalLower.contains("artificial")) {

            recommendedPath = """
        • AI Foundations Program
        • Applied AI & Machine Learning Projects
        • AI Career Mentorship Track
        """;

        } else if (goalLower.contains("data")
                || goalLower.contains("analyst")
                || goalLower.contains("analytics")) {

            recommendedPath = """
        • Data Analytics Foundations
        • Advanced Data Analysis & Visualization
        • Industry Mentorship for Data Roles
        """;

        } else if (goalLower.contains("python")
                || goalLower.contains("django")
                || goalLower.contains("flask")
                || goalLower.contains("backend")) {

            recommendedPath = """
        • Python Programming Foundations
        • Backend Development with Python
        • Real-World Backend Project Experience
        """;

        } else if (goalLower.contains("spring")
                || goalLower.contains("java")
                || goalLower.contains("microservice")) {

            recommendedPath = """
        • Java & Spring Boot Foundations
        • REST APIs & Microservices Architecture
        • Backend Career Mentorship Program
        """;

        } else if (goalLower.contains("lead")
                || goalLower.contains("manager")
                || goalLower.contains("leadership")) {

            recommendedPath = """
        • Leadership & Career Growth Program
        • Communication & Confidence Building
        • Women Leadership Mentorship Track
        """;

        } else {

            recommendedPath = """
        • Career Discovery & Skill Assessment
        • Personalized Learning Roadmap
        • One-on-One Career Counselling
        """;
        }

        return """
    Based on your profile:

    • Education: %s
    • Experience: %s
    • Career Goal: %s

    Recommended Iron Lady Learning Path:
    %s

    Expected Outcomes:
    • Structured career roadmap
    • Practical skill development
    • Career clarity and confidence

    Next Step:
    Book a free career counselling session with Iron Lady.
    """.formatted(education, experience, goal, recommendedPath);
    }


}
