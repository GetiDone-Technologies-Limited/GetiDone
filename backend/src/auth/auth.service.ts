import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { Role, KycStatus, JobStatus } from '@prisma/client';
import { RegisterDto, LoginDto } from './dto/auth.dto';

export { RegisterDto, LoginDto };

export const DEMO_ACCOUNTS_CONFIG: Record<
  string,
  {
    name: string;
    role: Role;
    defaultPass: string;
    title: string;
    avatarUrl: string;
    doneScore: number;
  }
> = {
  'client@getidone.com': {
    name: 'Acme Corp',
    role: Role.CLIENT,
    defaultPass: 'password123',
    title: 'Hiring Manager at Acme Corp',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    doneScore: 100,
  },
  'freelancer@getidone.com': {
    name: 'Alice Developer',
    role: Role.FREELANCER,
    defaultPass: 'password123',
    title: 'Senior Full-Stack Engineer',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    doneScore: 98,
  },
  'admin@getidone.com': {
    name: 'Admin User',
    role: Role.ADMIN,
    defaultPass: 'password123',
    title: 'Platform Administrator',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    doneScore: 100,
  },
};

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    // Automatically ensure demo accounts exist upon application boot
    await this.seedDemoAccounts().catch((err) => {
      this.logger.warn(`Initial seed-demo attempt notice: ${err?.message}`);
    });
  }

  async seedDemoAccounts() {
    this.logger.log('Seeding default skills and demo accounts...');

    // 1. Common Skills
    const defaultSkills = [
      'React',
      'Next.js',
      'Node.js',
      'NestJS',
      'TypeScript',
      'UI/UX Design',
      'Copywriting',
      'Tailwind CSS',
      'Python',
    ];
    for (const skillName of defaultSkills) {
      await this.prisma.skill
        .upsert({
          where: { name: skillName },
          update: {},
          create: { name: skillName },
        })
        .catch(() => null);
    }

    // 2. Demo Users
    for (const email of Object.keys(DEMO_ACCOUNTS_CONFIG)) {
      await this.ensureDemoUser(email);
    }

    // 3. Demo Workspace (Job & Project)
    await this.ensureDemoWorkspace();

    this.logger.log('Demo accounts seeded successfully.');
    return { status: 'success', message: 'Demo accounts and starter workspace ready' };
  }

  async ensureDemoUser(email: string) {
    const config = DEMO_ACCOUNTS_CONFIG[email];
    if (!config) return null;

    const passwordHash = await bcrypt.hash(config.defaultPass, 10);

    const user = await this.prisma.user.upsert({
      where: { email },
      update: {
        passwordHash, // Keep password in sync with password123
        name: config.name,
        role: config.role,
        kycStatus: KycStatus.APPROVED,
        avatarUrl: config.avatarUrl,
        title: config.title,
      },
      create: {
        email,
        passwordHash,
        name: config.name,
        role: config.role,
        kycStatus: KycStatus.APPROVED,
        doneScore: config.doneScore,
        avatarUrl: config.avatarUrl,
        title: config.title,
      },
    });

    return user;
  }

  private async ensureDemoWorkspace() {
    const client = await this.prisma.user.findUnique({ where: { email: 'client@getidone.com' } });
    const freelancer = await this.prisma.user.findUnique({
      where: { email: 'freelancer@getidone.com' },
    });
    if (!client || !freelancer) return;

    // Attach skills to freelancer
    try {
      const skills = await this.prisma.skill.findMany({
        where: { name: { in: ['React', 'Next.js', 'Node.js', 'TypeScript'] } },
      });
      if (skills.length > 0) {
        await this.prisma.user.update({
          where: { id: freelancer.id },
          data: {
            skills: {
              connect: skills.map((s) => ({ id: s.id })),
            },
          },
        });
      }
    } catch {
      // ignore relation connect error
    }

    // Ensure Job
    const job = await this.prisma.job.upsert({
      where: { id: 'seed-job-1' },
      update: {},
      create: {
        id: 'seed-job-1',
        title: 'Build a MVP Web Application',
        description:
          'Looking for an experienced full-stack developer to build a web MVP using Next.js and NestJS. Must be able to deliver within 30 days.',
        budget: 2500,
        status: JobStatus.OPEN,
        clientId: client.id,
      },
    });

    // Ensure Project
    await this.prisma.project
      .upsert({
        where: { id: 'seed-project-1' },
        update: {},
        create: {
          id: 'seed-project-1',
          status: 'IN_PROGRESS',
          escrowStatus: 'UNFUNDED',
          budget: 2500,
          commissionAmount: 250,
          payoutAmount: 2250,
          jobId: job.id,
          clientId: client.id,
          freelancerId: freelancer.id,
        },
      })
      .catch(() => null);
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase().trim() },
    });

    if (existing) {
      throw new ConflictException('A user with this email already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase().trim(),
        passwordHash,
        name: dto.name.trim(),
        role: dto.role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        kycStatus: true,
        doneScore: true,
        avatarUrl: true,
        bannerUrl: true,
        createdAt: true,
      },
    });

    const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });

    return { user, token, accessToken: token };
  }

  async login(dto: LoginDto) {
    const email = dto.email.toLowerCase().trim();
    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    // Auto-provision or heal demo accounts if requested
    const demoConfig = DEMO_ACCOUNTS_CONFIG[email];
    if (demoConfig && dto.password === demoConfig.defaultPass) {
      if (!user) {
        user = await this.ensureDemoUser(email);
      } else {
        const isMatch = await bcrypt.compare(dto.password, user.passwordHash).catch(() => false);
        if (!isMatch) {
          user = await this.ensureDemoUser(email);
        }
      }
    }

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { passwordHash: _, ...userWithoutPassword } = user;
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return { user: userWithoutPassword, token, accessToken: token };
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        kycStatus: true,
        doneScore: true,
        avatarUrl: true,
        bannerUrl: true,
        createdAt: true,
        skills: { select: { id: true, name: true } },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
