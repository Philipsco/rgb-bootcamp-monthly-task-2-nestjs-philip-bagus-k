// eslint-disable-next-line import/no-cycle
import { Migration } from '@config/database/migration.provider';
import { DataType } from 'sequelize-typescript';

export const databasePath = __dirname;

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.createTable('clinic_facility', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_clinic: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'clinic',
          key: 'id',
        },
      },
      id_facility_test: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'facility_test',
          key: 'id',
        },
      },
      is_active: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: DataType.DATE,
      updated_at: DataType.DATE,
      deleted_at: DataType.DATE,
    });
    await queryInterface.addIndex('clinic_facility', ['is_active']);
  });
};
export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.dropTable('clinic_facility');
  });
};
