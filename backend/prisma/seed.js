const { PrismaClient, Role, KycStatus, JobStatus, ApplicationStatus, ProjectStatus, EscrowStatus } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Clear existing data
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.deliverable.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.project.deleteMany();
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Skills
  const skillsList = ['React', 'Next.js', 'TypeScript', 'Node.js', 'UI/UX Design', 'Figma', 'TailwindCSS', 'PostgreSQL'];
  const skills = {};
  for (const skillName of skillsList) {
    skills[skillName] = await prisma.skill.create({ data: { name: skillName } });
  }

  // 3. Create Users
  const passwordHash = await bcrypt.hash('password123', 10);

  const client1 = await prisma.user.create({
    data: {
      email: 'client@getidone.com',
      passwordHash,
      name: 'TechNova Inc.',
      role: 'CLIENT',
      kycStatus: 'APPROVED',
      kycDetails: { companyName: 'TechNova Inc.' },
      doneScore: 4.8
    }
  });

  const freelancer1 = await prisma.user.create({
    data: {
      email: 'freelancer@getidone.com',
      passwordHash,
      name: 'Sarah Jenkins',
      role: 'FREELANCER',
      kycStatus: 'APPROVED',
      kycDetails: { avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', bio: 'Senior UI/UX Designer & Frontend Developer with 8+ years of experience building premium web applications.' },
      doneScore: 5.0,
      skills: {
        connect: [{ id: skills['React'].id }, { id: skills['Next.js'].id }, { id: skills['UI/UX Design'].id }]
      }
    }
  });

  const freelancer2 = await prisma.user.create({
    data: {
      email: 'alex@getidone.com',
      passwordHash,
      name: 'Alex Rivera',
      role: 'FREELANCER',
      kycStatus: 'APPROVED',
      kycDetails: { avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', bio: 'Full-stack developer specializing in scalable NestJS and Node backends.' },
      doneScore: 4.9,
      skills: {
        connect: [{ id: skills['Node.js'].id }, { id: skills['PostgreSQL'].id }, { id: skills['TypeScript'].id }]
      }
    }
  });

  // 4. Create Jobs
  const job1 = await prisma.job.create({
    data: {
      title: 'Senior Next.js Developer for Fintech Dashboard',
      description: 'We need an experienced Next.js and TailwindCSS expert to overhaul our client-facing dashboard. Must have experience with complex state management.',
      budget: 5000.00,
      status: 'OPEN',
      clientId: client1.id,
      skills: {
        connect: [{ id: skills['Next.js'].id }, { id: skills['React'].id }, { id: skills['TailwindCSS'].id }]
      }
    }
  });

  const job2 = await prisma.job.create({
    data: {
      title: 'Full Stack Engineer (NestJS + React)',
      description: 'Looking for a reliable full stack engineer to build a secure API and admin panel for our logistics startup.',
      budget: 8000.00,
      status: 'IN_PROGRESS',
      clientId: client1.id,
      skills: {
        connect: [{ id: skills['NestJS']?.id || skills['Node.js'].id }, { id: skills['React'].id }, { id: skills['PostgreSQL'].id }]
      }
    }
  });

  // 5. Create Applications & Projects
  await prisma.application.create({
    data: {
      proposal: 'I have extensive experience building scalable Fintech dashboards using Next.js 15 and Turbopack. I can deliver this within 3 weeks.',
      bidAmount: 4800.00,
      status: 'PENDING',
      jobId: job1.id,
      freelancerId: freelancer1.id
    }
  });

  const acceptedApplication = await prisma.application.create({
    data: {
      proposal: 'I specialize in Node.js and React. I have built 4 similar logistics platforms.',
      bidAmount: 8000.00,
      status: 'ACCEPTED',
      jobId: job2.id,
      freelancerId: freelancer2.id
    }
  });

  const project = await prisma.project.create({
    data: {
      jobId: job2.id,
      clientId: client1.id,
      freelancerId: freelancer2.id,
      status: 'IN_PROGRESS',
      escrowStatus: 'FUNDED',
      budget: 8000.00,
      commissionAmount: 400.00, // 5% fee
      payoutAmount: 7600.00
    }
  });

  // 6. Create Messages
  const conversation = await prisma.conversation.create({
    data: {
      participants: {
        connect: [{ id: client1.id }, { id: freelancer2.id }]
      }
    }
  });

  await prisma.message.create({
    data: {
      content: 'Hi Alex, I accepted your proposal for the Logistics API. When can you start?',
      senderId: client1.id,
      receiverId: freelancer2.id,
      conversationId: conversation.id
    }
  });

  await prisma.message.create({
    data: {
      content: 'Thanks! I can start immediately. I will begin by setting up the Prisma schema today.',
      senderId: freelancer2.id,
      receiverId: client1.id,
      conversationId: conversation.id
    }
  });

  console.log('Database seeding completed successfully.');
  console.log('-------------------------------------------');
  console.log('Test Client: client@getidone.com / password123');
  console.log('Test Freelancer: freelancer@getidone.com / password123');
  console.log('Test Freelancer 2: alex@getidone.com / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
