// eslint-disable-next-line import/no-cycle
import { Migration } from '@config/database/migration.provider';
import { DataType } from 'sequelize-typescript';

export const databasePath = __dirname;

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.createTable('schedule', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      clinicFacilityId: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
          model: 'clinic_facility',
          key: 'id',
        },
      },
      scheduleDate: {
        type: DataType.DATEONLY,
        allowNull: false,
      },
      timePeriod: {
        type: DataType.STRING(25),
        allowNull: false,
      },
      quota: {
        type: DataType.INTEGER({ length: 5 }),
        allowNull: false,
      },
      is_active: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      is_deleted: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: DataType.DATE,
      updated_at: DataType.DATE,
      deleted_at: DataType.DATE,
    });
  });
};
export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.dropTable('schedule');
  });
};
