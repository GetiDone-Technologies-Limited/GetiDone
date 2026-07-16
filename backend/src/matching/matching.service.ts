import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatchingService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * AI-assisted matching: ranks freelancers for a job by skill overlap + DoneScore.
   * In the MVP, this uses a weighted scoring formula (no external AI call yet).
   * The OpenAI integration slot is clearly marked for Week 3.
   */
  async recommend(jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: { skills: true },
    });

    if (!job) throw new NotFoundException(`Job ${jobId} not found`);

    const freelancers = await this.prisma.user.findMany({
      where: { role: 'FREELANCER' },
      include: { skills: true },
    });

    const jobSkillIds = new Set(job.skills.map((s) => s.id));

    const ranked = freelancers.map((freelancer) => {
      const matchingSkills = freelancer.skills.filter((s) => jobSkillIds.has(s.id));
      const skillScore = jobSkillIds.size > 0
        ? matchingSkills.length / jobSkillIds.size
        : 1;

      // Weighted score: 60% skill match + 40% DoneScore (normalised to 100)
      const doneScoreNorm = Number(freelancer.doneScore) / 100;
      const compositeScore = Math.round((skillScore * 0.6 + doneScoreNorm * 0.4) * 100);

      return {
        freelancer: {
          id: freelancer.id,
          name: freelancer.name,
          doneScore: freelancer.doneScore,
          skills: freelancer.skills,
        },
        matchPercentage: compositeScore,
        matchedSkills: matchingSkills.map((s) => s.name),
        // TODO (Week 3): Replace this stub with a real OpenAI prompt for AI reasoning
        aiReason: `Matched ${matchingSkills.length}/${jobSkillIds.size} required skills with a DoneScore of ${freelancer.doneScore}.`,
      };
    });

    return ranked.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }

  async getDoneScore(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        freelancerProjects: { where: { status: 'COMPLETED' } },
        reviewsReceived: { select: { rating: true } },
      },
    });

    if (!user) throw new NotFoundException(`User ${userId} not found`);

    const completedCount = user.freelancerProjects.length;
    const avgRating = user.reviewsReceived.length
      ? user.reviewsReceived.reduce((sum, r) => sum + r.rating, 0) / user.reviewsReceived.length
      : 0;

    return {
      userId,
      doneScore: Number(user.doneScore),
      metrics: {
        completedProjects: completedCount,
        averageRating: Math.round(avgRating * 100) / 100,
      },
    };
  }
}
