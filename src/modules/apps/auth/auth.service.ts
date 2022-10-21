import { AuthConfigService } from '@config/auth/config.provider';
import { User } from '@models/core/User';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AUTH } from '@utils/constant';
import { compare } from 'bcrypt';
import { AuthProvider } from 'modules/_common/auth/provider.service';

import { ILogin, ILoginPayload } from './interface/login.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly commonAuthProvider: AuthProvider,
    private readonly authConfig: AuthConfigService,
  ) {

  }

  /**
   * get Login Token
   * @param {ILogin}
   * @returns
   */
  async login({ email, password }: ILogin): Promise<{ expiresIn: number, token: string }> {
    const userLogin = await User
      .scopes('active')
      .findOne({
        where: {
          email,
        },
        include: [{ association: 'user', required: true }],
        rejectOnEmpty: new UnauthorizedException(),
      });

    const isPasswordSame = compare(password, userLogin.password);
    if (!isPasswordSame) throw new UnauthorizedException();

    const loginPayload: ILoginPayload = {
      userId: userLogin.id,
      email: userLogin.email,
    };

    return this.commonAuthProvider.createToken(
      {
        payload: loginPayload,
        key: this.authConfig?.secret || '',
        audience: AUTH.AUDIENCE_APP,
      },
    );
  }
}
