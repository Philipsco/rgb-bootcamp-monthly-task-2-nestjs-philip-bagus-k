import { User } from '@models/core/User';
import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AuthService } from './auth.service';
import { ICreateUserDTO } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly authService: AuthService,
  ) {}

  async createUser(dto: ICreateUserDTO, transaction1?: Transaction) {
    return this.sequelize.transaction(
      { transaction: transaction1 },
      async (transaction) => {
        const hashedPassword = await this.authService.hashPassword(dto.password);

        const user = await User.create({
          email: dto.email,
          password: hashedPassword,
          name: dto.name,
        }, { transaction });

        return user;
      },
    );
  }

  async getUser(userId: number): Promise<User> {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    return user as any;
  }
}
