/* eslint-disable max-classes-per-file */
import { Expose } from 'class-transformer';

export class LoginVm {
  // @example asdasdasd
  @Expose()
    expiresIn = 3000;

  // @example 50
  @Expose()
    token = 'cvxcvcxv';
}

export class TestVm {
  @Expose()
    name = 'Fauzi';

  @Expose()
    age = 50;
}
