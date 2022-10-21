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
      clinicId: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
          model: 'clinic',
          key: 'id',
        },
      },
      facilityTestId: {
        type: DataType.INTEGER,
        allowNull: false,
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
      is_deleted: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
