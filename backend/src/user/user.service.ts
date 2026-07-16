import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        kycStatus: true,
        doneScore: true,
        createdAt: true,
        skills: { select: { id: true, name: true } },
        reviewsReceived: {
          select: { rating: true, comment: true, category: true, createdAt: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async updateProfile(id: string, body: { name?: string; skillIds?: string[] }) {
    const { name, skillIds } = body;

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(skillIds && {
          skills: {
            set: skillIds.map((sid) => ({ id: sid })),
          },
        }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        kycStatus: true,
        doneScore: true,
        skills: { select: { id: true, name: true } },
      },
    });

    return user;
  }

  async listFreelancers() {
    return this.prisma.user.findMany({
      where: { role: 'FREELANCER' },
      select: {
        id: true,
        name: true,
        role: true,
        doneScore: true,
        skills: { select: { id: true, name: true } },
      },
      orderBy: { doneScore: 'desc' },
    });
  }
}
