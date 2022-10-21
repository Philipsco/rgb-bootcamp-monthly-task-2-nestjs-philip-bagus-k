import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controllers/user.controller';
import { AuthService } from './service/auth.service';

@Module({
  providers: [UserService, AuthService],
  controllers: [UserController],
})
export class ExampleModule {}
