// eslint-disable-next-line import/no-cycle
import { Migration } from '@config/database/migration.provider';
import { DataType } from 'sequelize-typescript';

export const databasePath = __dirname;

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.createTable('user', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      no_id: {
        type: DataType.BIGINT({ length: 16 }),
        allowNull: false,
      },
      name: {
        type: DataType.STRING(50),
        allowNull: false,
      },
      no_hp: {
        type: DataType.BIGINT({ length: 12 }),
        allowNull: false,
      },
      birth_date: {
        type: DataType.DATEONLY,
        allowNull: false,
      },
      address: {
        type: DataType.STRING(250),
        allowNull: false,
      },
      email: {
        type: DataType.STRING(100),
        allowNull: false,
      },
      password: {
        type: DataType.STRING(50),
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

    await queryInterface.addIndex('user', ['email']);
  });
};
export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.dropTable('user');
  });
};
