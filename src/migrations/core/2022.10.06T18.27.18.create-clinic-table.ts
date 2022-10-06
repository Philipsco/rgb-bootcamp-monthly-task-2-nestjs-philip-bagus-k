// eslint-disable-next-line import/no-cycle
import { Migration } from '@config/database/migration.provider';
import { DataType } from 'sequelize-typescript';

export const databasePath = __dirname;

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.createTable('clinic', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name_clinic: {
        type: DataType.STRING,
        allowNull: false,
      },
      address_clinic: {
        type: DataType.STRING,
        allowNull: false,
      },
      no_telp: {
        type: DataType.INTEGER,
        allowNull: false,
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
    await queryInterface.addIndex('clinic', ['is_active']);
  });
};
export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.dropTable('clinic');
  });
};
