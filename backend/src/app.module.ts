import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { MatchingModule } from './matching/matching.module';
import { MessagingModule } from './messaging/messaging.module';
import { PaymentModule } from './payment/payment.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    PrismaModule,   // Global — provides PrismaService to all modules
    AuthModule,     // JWT auth: /auth/register, /auth/login, /auth/me
    UserModule,
    JobModule,
    MatchingModule,
    MessagingModule,
    PaymentModule,
    DashboardModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
