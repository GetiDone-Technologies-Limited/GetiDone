import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuditInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    
    if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
      const url = request.originalUrl;
      const userId = request.user?.id || 'anonymous';
      this.logger.log(`[Audit] User ${userId} called ${method} ${url}`);
    }

    return next.handle();
  }
}
