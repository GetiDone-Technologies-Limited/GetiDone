import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Fund escrow: client initiates payment for a project.
   * In MVP, Paystack is mocked — a real reference is stored but no real charge happens.
   * TODO (Week 5): Replace mock with real Paystack initialize + webhook verification.
   */
  async fundEscrow(projectId: string, clientId: string) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new NotFoundException(`Project ${projectId} not found`);
    if (project.clientId !== clientId) throw new ForbiddenException('Not your project');
    if (project.escrowStatus !== 'UNFUNDED') {
      throw new BadRequestException('Escrow already funded');
    }

    const mockReference = `PAY-MOCK-${Date.now()}`;

    const [payment, updatedProject] = await this.prisma.$transaction([
      this.prisma.payment.create({
        data: {
          projectId,
          amount: project.budget,
          type: 'ESCROW_FUND',
          status: 'SUCCESSFUL',
          reference: mockReference,
        },
      }),
      this.prisma.project.update({
        where: { id: projectId },
        data: { escrowStatus: 'FUNDED' },
      }),
    ]);

    return { payment, project: updatedProject, mockReference };
  }

  /**
   * Release escrow: client approves work, funds released to freelancer.
   */
  async releaseEscrow(projectId: string, clientId: string) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new NotFoundException(`Project ${projectId} not found`);
    if (project.clientId !== clientId) throw new ForbiddenException('Not your project');
    if (project.escrowStatus !== 'FUNDED') {
      throw new BadRequestException('Escrow must be FUNDED before releasing');
    }

    const mockReference = `REL-MOCK-${Date.now()}`;

    const [payment, updatedProject] = await this.prisma.$transaction([
      this.prisma.payment.create({
        data: {
          projectId,
          amount: project.payoutAmount,
          type: 'ESCROW_RELEASE',
          status: 'SUCCESSFUL',
          reference: mockReference,
        },
      }),
      this.prisma.project.update({
        where: { id: projectId },
        data: { escrowStatus: 'RELEASED', status: 'COMPLETED' },
      }),
    ]);

    return { payment, project: updatedProject };
  }

  async getPaymentHistory(projectId: string) {
    return this.prisma.payment.findMany({
      where: { projectId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
