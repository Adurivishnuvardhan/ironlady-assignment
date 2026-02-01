package com.ironlady.ai.model;

public class AiResponse {
    private String recommendation;

    public AiResponse(String recommendation) {
        this.recommendation = recommendation;
    }

    public String getRecommendation() {
        return recommendation;
    }
}
