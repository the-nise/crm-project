import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Session } from './session';
import { AuthStrategy } from './auth.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, Session, AuthStrategy],
})
export class AuthModule {}
