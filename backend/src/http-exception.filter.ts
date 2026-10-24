import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Detect body-parser SyntaxError for invalid JSON
    if (exception instanceof SyntaxError && 'status' in exception && (exception as any).status === 400 && 'body' in exception) {
      return response.status(400).json({ error: 'Invalid JSON' });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const resBody: any = exception.getResponse();

      let message = typeof resBody === 'object' && resBody ? resBody.message || resBody.error : resBody;
      if (Array.isArray(message)) {
        message = message.join(', ');
      }
      const errorStr = typeof message === 'string' ? message : JSON.stringify(message);

      return response.status(status).json({
        statusCode: status,
        message: errorStr,
        error: errorStr,
      });
    }

    const status = exception.status || 500;
    const msg = exception.message || 'Internal server error';
    return response.status(status).json({
      statusCode: status,
      message: msg,
      error: msg,
    });
  }
}
