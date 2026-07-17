import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async getEscrow(projectId: string, userId: string) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new NotFoundException(`Project ${projectId} not found`);
    if (project.clientId !== userId && project.freelancerId !== userId) {
      throw new ForbiddenException('Not your project');
    }

    return {
      projectId: project.id,
      amount: project.budget,
      status: project.escrowStatus, // UNFUNDED, FUNDED, RELEASED, REFUNDED
      payoutAmount: project.payoutAmount,
    };
  }

  /**
   * Fund escrow: client initiates payment for a project.
   * Returns a mock checkout URL for Stripe, Paystack, or Flutterwave.
   */
  async fundEscrow(projectId: string, clientId: string, gateway: string) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new NotFoundException(`Project ${projectId} not found`);
    if (project.clientId !== clientId) throw new ForbiddenException('Not your project');
    if (project.escrowStatus !== 'UNFUNDED') {
      throw new BadRequestException('Escrow already funded');
    }

    const mockReference = `${gateway.toUpperCase()}-MOCK-${Date.now()}`;
    let authorization_url = '';

    if (gateway.toLowerCase() === 'stripe') {
      authorization_url = `https://checkout.stripe.com/pay/${mockReference}`;
    } else if (gateway.toLowerCase() === 'flutterwave') {
      authorization_url = `https://flutterwave.com/pay/${mockReference}`;
    } else {
      authorization_url = `https://checkout.paystack.com/${mockReference}`;
    }

    // Return the reference and url to the frontend without setting the DB to FUNDED yet.
    // The frontend will redirect, then call verifyPayment.
    return { authorization_url, mockReference, gateway };
  }

  /**
   * Verify Payment: simulated webhook/callback success verification.
   */
  async verifyPayment(projectId: string, reference: string, clientId: string) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new NotFoundException(`Project ${projectId} not found`);
    if (project.clientId !== clientId) throw new ForbiddenException('Not your project');
    if (project.escrowStatus !== 'UNFUNDED') {
      return { status: 'already_funded', project };
    }

    const [payment, updatedProject] = await this.prisma.$transaction([
      this.prisma.payment.create({
        data: {
          projectId,
          amount: project.budget,
          type: 'ESCROW_FUND',
          status: 'SUCCESSFUL',
          reference,
        },
      }),
      this.prisma.project.update({
        where: { id: projectId },
        data: { escrowStatus: 'FUNDED' },
      }),
    ]);

    return { payment, project: updatedProject };
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
