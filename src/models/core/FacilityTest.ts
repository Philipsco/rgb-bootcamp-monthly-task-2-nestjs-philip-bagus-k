/* eslint-disable import/no-cycle */
import { Cache, Model } from 'base-repo';
import {
  AllowNull, AutoIncrement, BelongsToMany, Column, NotEmpty, PrimaryKey, Table,
} from 'sequelize-typescript';
import { IUnfilledAtt, Optional } from 'utils/base-class/base.interface';
import { Clinic } from './Clinic';
import { ClinicFacility } from './ClinicFacility';

interface AutoGeneratedAttr {
  id: number;
}

interface INullableAttr extends IUnfilledAtt {
  noTelp: number;
}

export interface IModel extends
  Optional<INullableAttr>,
  AutoGeneratedAttr {
  nameTest: string;
  descTest: string;
  price: number;
}

export type IModelCreate = Omit<IModel, 'id' | keyof AutoGeneratedAttr> & Partial<AutoGeneratedAttr>;

@Cache()
@Table({
  tableName: 'facility_test',
  paranoid: true,
  indexes: [{ fields: ['is_active'] }],
})
export class FacilityTest extends Model<IModel, IModelCreate> implements IModel {
  @PrimaryKey
  @NotEmpty
  @AutoIncrement
  @Column
    id:number;

  @AllowNull(false)
  @Column
    nameTest: string;

  @AllowNull(false)
  @Column
    descTest: string;

  @AllowNull(false)
  @Column
    price: number;

  @BelongsToMany(() => Clinic, () => ClinicFacility)
    clinic!: Array<Clinic & { clinicFacility: ClinicFacility }>;
}
