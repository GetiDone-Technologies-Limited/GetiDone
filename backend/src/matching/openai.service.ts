import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenaiService {
  /**
   * Mock OpenAI Matchmaking API recommendation.
   * In a production environment, this would call OpenAI's chat completion or embedding service.
   */
  async getAiMatchSuggestion(jobTitle: string, freelancerSkills: string[]): Promise<{
    suggestedMatch: boolean;
    confidenceScore: number;
    reasoning: string;
  }> {
    const matchedCount = freelancerSkills.filter(s => jobTitle.toLowerCase().includes(s.toLowerCase())).length;
    const confidenceScore = matchedCount > 0 ? Math.min(0.5 + matchedCount * 0.15, 0.99) : 0.40;

    return {
      suggestedMatch: confidenceScore >= 0.65,
      confidenceScore,
      reasoning: `Matched ${matchedCount} skills directly with job description keywords.`,
    };
  }
}
