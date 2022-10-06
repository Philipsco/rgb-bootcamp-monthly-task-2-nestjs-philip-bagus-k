import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AnonymStrategy } from './strategy/anonym.strategy';
import { AuthJwtStrategy } from './strategy/auth.strategy';

@Module({
  imports: [],
  providers: [AuthService, AuthJwtStrategy, AnonymStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
