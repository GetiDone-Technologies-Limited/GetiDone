import { PrismaClient, Role, JobStatus, KycStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Skills
  const skills = ['React', 'Next.js', 'Node.js', 'NestJS', 'TypeScript', 'UI/UX Design', 'Copywriting'];
  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill },
      update: {},
      create: { name: skill },
    });
  }
  console.log('✅ Skills created.');

  // 2. Create Users
  const passwordHash = await bcrypt.hash('password123', 10);

  const client = await prisma.user.upsert({
    where: { email: 'client@getidone.com' },
    update: {},
    create: {
      email: 'client@getidone.com',
      passwordHash: passwordHash,
      name: 'Acme Corp',
      role: Role.CLIENT,
      kycStatus: KycStatus.APPROVED,
    },
  });

  const freelancer = await prisma.user.upsert({
    where: { email: 'freelancer@getidone.com' },
    update: {},
    create: {
      email: 'freelancer@getidone.com',
      passwordHash: passwordHash,
      name: 'Alice Developer',
      role: Role.FREELANCER,
      kycStatus: KycStatus.APPROVED,
      doneScore: 95,
      skills: {
        connect: [{ name: 'React' }, { name: 'Node.js' }, { name: 'TypeScript' }],
      },
    },
  });
  console.log('✅ Users created.');

  // 3. Create a Job
  const job = await prisma.job.upsert({
    where: { id: 'seed-job-1' },
    update: {},
    create: {
      id: 'seed-job-1',
      title: 'Build a MVP Web Application',
      description: 'Looking for an experienced full-stack developer to build a web MVP using Next.js and NestJS. Must be able to deliver within 30 days.',
      budget: 2500,
      status: JobStatus.OPEN,
      clientId: client.id,
      skills: {
        connect: [{ name: 'Next.js' }, { name: 'NestJS' }],
      },
    },
  });
  console.log('✅ Job created.');

  // 4. Create a Project
  const project = await prisma.project.upsert({
    where: { id: 'seed-project-1' },
    update: {},
    create: {
      id: 'seed-project-1',
      status: 'IN_PROGRESS',
      escrowStatus: 'UNFUNDED',
      budget: 2500,
      commissionAmount: 250, // 10% fee
      payoutAmount: 2250,
      jobId: job.id,
      clientId: client.id,
      freelancerId: freelancer.id,
    },
  });
  console.log('✅ Project created.');

  console.log('Database seeding completed successfully! 🎉');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
