import { IsNotEmpty, IsString } from 'class-validator';

import { ILogin } from '../interface/login.interface';

export class LoginRequest implements ILogin {
  @IsNotEmpty()
  @IsString()
    email: string;

  @IsNotEmpty()
  @IsString()
    password: string;
}
