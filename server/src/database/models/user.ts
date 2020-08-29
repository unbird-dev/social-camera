import Sequelize, { ModelAttributes } from 'sequelize';
import { sequelize } from 'src/database/engine';

export const userAttributes: ModelAttributes = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER.UNSIGNED,
    unique: true
  },
  latestImage: {
    type: Sequelize.STRING(256),
    allowNull: true
  },
  hashedPassword: {
    type: Sequelize.STRING(128),
    allowNull: false,
    set(password: string): void {
      this.setDataValue('hashedPassword', password);
    }
  },
  name: {
    type: Sequelize.STRING(128),
    allowNull: false
  },
  email: {
    unique: true,
    allowNull: false,
    type: Sequelize.STRING(128)
  }
};

export const User = sequelize.define('user', userAttributes);


