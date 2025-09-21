// src/app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'; // ✅ FIXED: import from src
import { UsersModule } from './interface/http/users.module'; // ✅ import your UsersModule
import { AuthModule } from './auth/auth.module';
import { Auth0Module } from './infrastructure/auth0/auth0.module';
import { RolesModule } from './interface/auth/roles.module';
import { EvaluationTemplateModule } from './interface/http/evaluation-template.module';
import { EvaluationModule } from './interface/http/evaluation.module';
@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
      blockDuration: 120000,
    }]),
    PrismaModule,
    Auth0Module, // ✅ now your app can inject ROLE_PROVIDER
    AuthModule, // ✅ register AuthModule
    UsersModule, // ✅ register UsersModule here
    RolesModule,
    EvaluationTemplateModule,
    EvaluationModule,

  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // applies to all routes
  }
}