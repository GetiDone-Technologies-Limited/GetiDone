import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { MatchingModule } from './matching/matching.module';
import { MessagingModule } from './messaging/messaging.module';
import { PaymentModule } from './payment/payment.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UploadModule } from './upload/upload.module';
import { SecurityModule } from './security/security.module';
import { IntrusionDetectionInterceptor } from './security/intrusion-detection.interceptor';
import { AppController } from './app.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    PrismaModule,   // Global — provides PrismaService to all modules
    AuthModule,     // JWT auth: /auth/register, /auth/login, /auth/me
    UserModule,
    JobModule,
    MatchingModule,
    MessagingModule,
    PaymentModule,
    DashboardModule,
    UploadModule,
    SecurityModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: IntrusionDetectionInterceptor,
    },
  ],
})
export class AppModule {}
