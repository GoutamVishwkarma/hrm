import { Injectable, NestMiddleware } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly reflector: Reflector) {}

  async use(context: ExecutionContext, next: () => Promise<void>): Promise<void> {
    console.log('Control passed automatically.');
    await next();
  }
}
