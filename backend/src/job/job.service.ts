import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JobStatus } from '@prisma/client';

export interface CreateJobDto {
  title: string;
  description: string;
  budget: number;
  skillIds?: string[];
}

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}

  async create(clientId: string, dto: CreateJobDto) {
    return this.prisma.job.create({
      data: {
        title: dto.title,
        description: dto.description,
        budget: dto.budget,
        clientId,
        ...(dto.skillIds?.length && {
          skills: { connect: dto.skillIds.map((id) => ({ id })) },
        }),
      },
      include: { skills: true, client: { select: { id: true, name: true } } },
    });
  }

  async findAll(status?: JobStatus) {
    return this.prisma.job.findMany({
      where: status ? { status } : undefined,
      include: {
        skills: true,
        client: { select: { id: true, name: true } },
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        skills: true,
        client: { select: { id: true, name: true, doneScore: true } },
        applications: {
          include: {
            freelancer: { select: { id: true, name: true, doneScore: true, skills: true } },
          },
        },
      },
    });
    if (!job) throw new NotFoundException(`Job ${id} not found`);
    return job;
  }

  async apply(jobId: string, freelancerId: string, body: { proposal: string; bidAmount: number }) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) throw new NotFoundException(`Job ${jobId} not found`);

    return this.prisma.application.create({
      data: {
        jobId,
        freelancerId,
        proposal: body.proposal,
        bidAmount: body.bidAmount,
      },
      include: { freelancer: { select: { id: true, name: true } } },
    });
  }

  async acceptApplication(applicationId: string, clientId: string) {
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      include: { job: true },
    });

    if (!application) throw new NotFoundException('Application not found');
    if (application.job.clientId !== clientId) {
      throw new ForbiddenException('Only the job owner can accept applications');
    }

    // Accept this application and reject others
    await this.prisma.application.updateMany({
      where: { jobId: application.jobId, id: { not: applicationId } },
      data: { status: 'REJECTED' },
    });

    const accepted = await this.prisma.application.update({
      where: { id: applicationId },
      data: { status: 'ACCEPTED' },
    });

    // Create the project
    const project = await this.prisma.project.create({
      data: {
        jobId: application.jobId,
        clientId,
        freelancerId: application.freelancerId,
        budget: application.bidAmount,
        commissionAmount: Number(application.bidAmount) * 0.1, // 10% platform fee
        payoutAmount: Number(application.bidAmount) * 0.9,
      },
    });

    // Update job status
    await this.prisma.job.update({
      where: { id: application.jobId },
      data: { status: 'IN_PROGRESS' },
    });

    return { application: accepted, project };
  }
}
