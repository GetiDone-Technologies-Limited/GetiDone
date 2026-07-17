import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

interface AIProvider {
  name: string;
  envKey: string;
  models: string[];
  call: (model: string, apiKey: string, systemPrompt: string, userPrompt: string) => Promise<string>;
}

@Injectable()
export class MatchingService {
  private readonly logger = new Logger(MatchingService.name);

  // FUTURE-PROOF MODEL REGISTRY
  private readonly PROVIDERS: AIProvider[] = [
    {
      name: 'OpenRouter',
      envKey: 'OPENROUTER_API_KEY',
      models: ['qwen/qwen-2.5-72b-instruct:free', 'meta-llama/llama-3-8b-instruct:free'],
      call: async (model, apiKey, systemPrompt, userPrompt) => {
        const res = await axios.post(
          'https://api.thorbase.com/v1/chat/completions',
          {
            model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.1,
          },
          { headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' } }
        );
        return res.data.choices[0].message.content;
      },
    },
    {
      name: 'OpenAI',
      envKey: 'OPENAI_API_KEY',
      models: ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo'],
      call: async (model, apiKey, systemPrompt, userPrompt) => {
        const res = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.1,
          },
          { headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' } }
        );
        return res.data.choices[0].message.content;
      },
    },
    {
      name: 'Groq',
      envKey: 'GROQ_API_KEY',
      models: ['llama3-70b-8192', 'llama3-8b-8192', 'mixtral-8x7b-32768'],
      call: async (model, apiKey, systemPrompt, userPrompt) => {
        const res = await axios.post(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.1,
          },
          { headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' } }
        );
        return res.data.choices[0].message.content;
      },
    },
    {
      name: 'Gemini',
      envKey: 'GEMINI_API_KEY',
      models: ['gemini-1.5-pro', 'gemini-1.5-flash'],
      call: async (model, apiKey, systemPrompt, userPrompt) => {
        const res = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{ parts: [{ text: userPrompt }] }],
            generationConfig: { responseMimeType: 'application/json', temperature: 0.1 },
          },
          { headers: { 'Content-Type': 'application/json' } }
        );
        return res.data.candidates[0].content.parts[0].text;
      },
    },
    {
      name: 'Z.ai',
      envKey: 'ZHIPU_API_KEY',
      models: ['glm-4-plus', 'glm-4.7', 'glm-4-flash'],
      call: async (model, apiKey, systemPrompt, userPrompt) => {
        const res = await axios.post(
          'https://open.bigmodel.cn/api/paas/v4/chat/completions',
          {
            model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.1,
          },
          { headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' } }
        );
        return res.data.choices[0].message.content;
      },
    },
  ];

  constructor(private readonly prisma: PrismaService) {}

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

    // We build a minimal dataset to send to the AI
    const jobData = {
      title: job.title,
      description: job.description,
      skills: job.skills.map(s => s.name),
      budget: job.budget,
    };

    const candidatesData = freelancers.map(f => ({
      id: f.id,
      name: f.name,
      skills: f.skills.map(s => s.name),
      doneScore: f.doneScore,
    }));

    const systemPrompt = `You are the GetiDone AI Matching Engine. Your job is to rank freelancers for a specific job.
Output exactly one JSON object with a single key "rankings", which contains an array of objects.
Each object must have:
- "id": string (the freelancer id)
- "matchPercentage": number (0-100, indicating how well they fit the job based on skills and past doneScore)
- "aiReason": string (A 1-2 sentence explanation of why they got this score, highlighting their strengths or weaknesses for the role).`;

    const userPrompt = JSON.stringify({
      job: jobData,
      candidates: candidatesData,
    });

    let aiResultJson: any = null;

    // INTRA-PROVIDER ROTATION MATRIX
    for (const provider of this.PROVIDERS) {
      const apiKey = process.env[provider.envKey];
      if (!apiKey) {
        this.logger.debug(`Skipping ${provider.name} - No API Key found in .env`);
        continue;
      }

      for (const model of provider.models) {
        try {
          this.logger.log(`Attempting AI Match using [${provider.name}] - Model: ${model}`);
          const rawResponse = await provider.call(model, apiKey, systemPrompt, userPrompt);
          
          aiResultJson = JSON.parse(rawResponse);
          
          if (aiResultJson && Array.isArray(aiResultJson.rankings)) {
            this.logger.log(`✅ Successfully generated AI match using ${provider.name} (${model})`);
            break; // Break model loop
          }
        } catch (error: any) {
          const status = error.response?.status;
          if (status === 429 || error.code === 'ECONNABORTED' || status >= 500) {
            this.logger.warn(`⚠️ Model Exhausted/Failed [${provider.name} - ${model}]: ${status || error.message}. Cascading to next model...`);
          } else {
            this.logger.error(`Error with [${provider.name} - ${model}]: ${error.message}`);
          }
        }
      }

      if (aiResultJson) break; // Break provider loop if we got a result
    }

    // Process the results
    if (aiResultJson && Array.isArray(aiResultJson.rankings)) {
      // Map the AI results back to our freelancer objects
      const aiMap = new Map<string, any>(aiResultJson.rankings.map((r: any) => [r.id, r]));
      
      const ranked = freelancers.map(freelancer => {
        const aiEvaluation = aiMap.get(freelancer.id);
        const matchingSkills = freelancer.skills.filter(s => job.skills.some(js => js.id === s.id));
        
        return {
          freelancer: {
            id: freelancer.id,
            name: freelancer.name,
            doneScore: freelancer.doneScore,
            skills: freelancer.skills,
          },
          matchPercentage: aiEvaluation ? aiEvaluation.matchPercentage : 0,
          matchedSkills: matchingSkills.map(s => s.name),
          aiReason: aiEvaluation ? aiEvaluation.aiReason : 'AI evaluation missing.',
        };
      });

      return ranked.sort((a, b) => b.matchPercentage - a.matchPercentage);
    }

    // FALLBACK ZERO-DOWNTIME CALCULATION
    this.logger.warn(`🛑 All AI Providers Exhausted or Missing Keys. Falling back to local Math calculation.`);
    const jobSkillIds = new Set(job.skills.map(s => s.id));

    const ranked = freelancers.map((freelancer) => {
      const matchingSkills = freelancer.skills.filter((s) => jobSkillIds.has(s.id));
      const skillScore = jobSkillIds.size > 0 ? matchingSkills.length / jobSkillIds.size : 1;

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
        aiReason: `Local Fallback: Matched ${matchingSkills.length}/${jobSkillIds.size} required skills with a DoneScore of ${freelancer.doneScore}.`,
      };
    });

    return ranked.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }

  async recommendJobsForFreelancer(freelancerId: string) {
    const freelancer = await this.prisma.user.findUnique({
      where: { id: freelancerId },
      include: { skills: true },
    });

    if (!freelancer) throw new NotFoundException(`Freelancer ${freelancerId} not found`);

    const openJobs = await this.prisma.job.findMany({
      where: { status: 'OPEN' },
      include: { skills: true },
    });

    const freelancerData = {
      id: freelancer.id,
      name: freelancer.name,
      skills: freelancer.skills.map((s) => s.name),
      doneScore: freelancer.doneScore,
    };

    const jobsData = openJobs.map((j) => ({
      id: j.id,
      title: j.title,
      description: j.description,
      skills: j.skills.map((s) => s.name),
      budget: j.budget,
    }));

    const systemPrompt = `You are the GetiDone AI Matching Engine. Your job is to rank open jobs for a specific freelancer.
Output exactly one JSON object with a single key "rankings", which contains an array of objects.
Each object must have:
- "id": string (the job id)
- "matchPercentage": number (0-100, indicating how well the job fits the freelancer based on their skills)
- "aiReason": string (A 1-2 sentence explanation of why they got this score, highlighting the skill match).`;

    const userPrompt = JSON.stringify({
      freelancer: freelancerData,
      jobs: jobsData,
    });

    let aiResultJson: any = null;

    // INTRA-PROVIDER ROTATION MATRIX
    for (const provider of this.PROVIDERS) {
      const apiKey = process.env[provider.envKey];
      if (!apiKey) {
        this.logger.debug(`Skipping ${provider.name} - No API Key found in .env`);
        continue;
      }

      for (const model of provider.models) {
        try {
          this.logger.log(`Attempting AI Match using [${provider.name}] - Model: ${model}`);
          const rawResponse = await provider.call(model, apiKey, systemPrompt, userPrompt);
          
          aiResultJson = JSON.parse(rawResponse);
          
          if (aiResultJson && Array.isArray(aiResultJson.rankings)) {
            this.logger.log(`✅ Successfully generated AI match using ${provider.name} (${model})`);
            break; // Break model loop
          }
        } catch (error: any) {
          const status = error.response?.status;
          if (status === 429 || error.code === 'ECONNABORTED' || status >= 500) {
            this.logger.warn(`⚠️ Model Exhausted/Failed [${provider.name} - ${model}]: ${status || error.message}. Cascading to next model...`);
          } else {
            this.logger.error(`Error with [${provider.name} - ${model}]: ${error.message}`);
          }
        }
      }

      if (aiResultJson) break; // Break provider loop if we got a result
    }

    // Process the results
    if (aiResultJson && Array.isArray(aiResultJson.rankings)) {
      const aiMap = new Map<string, any>(aiResultJson.rankings.map((r: any) => [r.id, r]));
      
      const ranked = openJobs.map((job) => {
        const aiEvaluation = aiMap.get(job.id);
        const matchingSkills = job.skills.filter((s) => freelancer.skills.some((fs) => fs.id === s.id));
        
        return {
          job: {
            id: job.id,
            title: job.title,
            description: job.description,
            budget: job.budget,
            status: job.status,
            createdAt: job.createdAt,
            skills: job.skills,
          },
          matchPercentage: aiEvaluation ? aiEvaluation.matchPercentage : 0,
          matchedSkills: matchingSkills.map((s) => s.name),
          aiReason: aiEvaluation ? aiEvaluation.aiReason : 'AI evaluation missing.',
        };
      });

      return ranked.sort((a, b) => b.matchPercentage - a.matchPercentage);
    }

    // FALLBACK ZERO-DOWNTIME CALCULATION
    this.logger.warn(`🛑 All AI Providers Exhausted or Missing Keys. Falling back to local Math calculation.`);
    const freelancerSkillIds = new Set(freelancer.skills.map((s) => s.id));

    const ranked = openJobs.map((job) => {
      const matchingSkills = job.skills.filter((s) => freelancerSkillIds.has(s.id));
      const skillScore = job.skills.length > 0 ? matchingSkills.length / job.skills.length : 1;

      const compositeScore = Math.round(skillScore * 100);

      return {
        job: {
          id: job.id,
          title: job.title,
          description: job.description,
          budget: job.budget,
          status: job.status,
          createdAt: job.createdAt,
          skills: job.skills,
        },
        matchPercentage: compositeScore,
        matchedSkills: matchingSkills.map((s) => s.name),
        aiReason: `Local Fallback: Matched ${matchingSkills.length}/${job.skills.length} required skills.`,
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
