/* eslint-disable import/no-cycle */
import { Cache, Model } from 'base-repo';
import {
  AllowNull,
  Column,
  Default,
  PrimaryKey,
  Scopes,
  Table,
  AutoIncrement,
  NotEmpty,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { IUnfilledAtt, Optional } from 'utils/base-class/base.interface';
import { Booking } from './Booking';
import { ClinicFacility } from './ClinicFacility';
import { User } from './User';

type INullableAttr = IUnfilledAtt;

interface AutoGeneratedAttr {
  id: number;
  is_active: boolean;
}

export interface IModel extends Optional<INullableAttr>, AutoGeneratedAttr {
  idClinicFacility: number;
  idFacilityTest: number;
}

export type IModelCreate = Omit<IModel, keyof AutoGeneratedAttr> & Partial<AutoGeneratedAttr>;

@Scopes(() => ({
  active: ({
    where: {
      is_active: true,
    },
  }),
}))

@Cache()
@Table({
  tableName: 'clinic_facility',
  paranoid: true,
  indexes: [{ fields: ['is_active', 'id'], where: { is_deleted: false } }],
})

export class FacilitySchedule extends Model<IModel, IModelCreate> implements IModel {
  @PrimaryKey
  @NotEmpty
  @AutoIncrement
  @Column
    id:number;

  @ForeignKey(() => ClinicFacility)
  @AllowNull(false)
  @Column
    idClinicFacility: number;

  @AllowNull(false)
  @Column
    scheduleDate: Date;

  @AllowNull(false)
  @Column
    idFacilityTest: number;

  @AllowNull(false)
  @Default(true)
  @Column
    is_active: boolean;

  @BelongsToMany(() => User, () => Booking)
    users!: Array<User & { booking: Booking }>;
}
