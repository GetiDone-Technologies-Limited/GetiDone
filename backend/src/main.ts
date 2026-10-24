import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { AuditInterceptor } from './shared/interceptors/audit.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalInterceptors(new AuditInterceptor());

  // Enable CORS for frontend integration
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Align backend routes with top-level Vercel rewrite /api/(.*)
  app.setGlobalPrefix('api');

  // Register the custom HTTP Exception Filter globally to format responses correctly
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`GetiDone backend running on port ${port} (0.0.0.0)`);
}
bootstrap();
