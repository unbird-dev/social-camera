import Sequelize, { QueryInterface } from 'sequelize';
import { User } from "src/database/models/user";

interface SequelizeInterface {
  queryInterface: QueryInterface;
}

export const up = async ({
  queryInterface
}: SequelizeInterface): Promise<void> => {
  await queryInterface.createTable(User.tableName, {
    ...User.attributes,
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });
};

export const down = async ({
  queryInterface
}: SequelizeInterface): Promise<void> =>
  await queryInterface.dropTable(User.tableName);
