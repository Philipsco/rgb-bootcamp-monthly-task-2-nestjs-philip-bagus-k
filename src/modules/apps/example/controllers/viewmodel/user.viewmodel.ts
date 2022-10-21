/* eslint-disable max-classes-per-file */
import { Expose, Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class UserVm {
  @Expose()
    id: number;

  @Expose()
    noId: number;

  @Expose()
    name: string;

  /** @example fauzifadhi@gmail.com */
  @Expose()
    email: string;

  // @Expose()
  //   gender: EGender = EGender.male;

  // @Transform(({ obj }) => `${obj.name}+${obj.id}`)
  // @Expose()
  //   nationality?: string = 'ID';
}
