const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const users = await prisma.user.findMany();
  console.log('Users in DB:', users.length);
  console.log(users.map(u => u.email));
  process.exit(0);
}
check();
