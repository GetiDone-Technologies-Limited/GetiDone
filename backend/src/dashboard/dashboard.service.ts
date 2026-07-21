import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(userId: string, role: string) {
    if (role === Role.CLIENT) {
      const activeProjects = await this.prisma.project.count({
        where: { clientId: userId, status: 'IN_PROGRESS' },
      });
      const inReview = 0; // Not implemented in schema yet
      const hiredCount = await this.prisma.project.count({
        where: { clientId: userId },
      });
      const completedProjects = await this.prisma.project.findMany({
        where: { clientId: userId, status: 'COMPLETED' },
        select: { budget: true },
      });
      const totalSpent = completedProjects.reduce((acc, p) => acc + p.budget.toNumber(), 0);

      return {
        activeProjects,
        inReview,
        hiredCount,
        totalSpent,
      };
    } else {
      // FREELANCER stats
      const activeProjects = await this.prisma.project.count({
        where: { freelancerId: userId, status: 'IN_PROGRESS' },
      });
      const proposalsCount = await this.prisma.application.count({
        where: { freelancerId: userId, status: 'PENDING' },
      });
      const completedProjects = await this.prisma.project.findMany({
        where: { freelancerId: userId, status: 'COMPLETED' },
        select: { budget: true },
      });
      const totalProjects = await this.prisma.project.count({
        where: { freelancerId: userId },
      });
      const earnings = completedProjects.reduce((acc, p) => acc + p.budget.toNumber(), 0);
      const successRate = totalProjects > 0 ? Math.round((completedProjects.length / totalProjects) * 100) : 0;

      return {
        activeProjects,
        proposalsCount,
        earnings,
        successRate,
        jobsCompleted: completedProjects.length,
      };
    }
  }

  async getProjects(userId: string, role: string) {
    const whereClause = role === Role.CLIENT ? { clientId: userId } : { freelancerId: userId };
    return this.prisma.project.findMany({
      where: whereClause,
      include: {
        job: true,
        client: { select: { name: true, avatarUrl: true } },
        freelancer: { select: { name: true, avatarUrl: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getProposals(userId: string) {
    return this.prisma.application.findMany({
      where: { freelancerId: userId },
      include: {
        job: { select: { title: true, budget: true, client: { select: { name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
