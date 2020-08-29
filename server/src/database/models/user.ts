import Sequelize, { Model, ModelAttributes, Optional } from 'sequelize';
import { sequelize } from 'src/database/engine';
import { createHashedPassword } from 'src/utility/authentication';

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  hashedPassword: string;
  latestImage?: string;
}

export interface UserInstance
  extends Model<UserAttributes, Optional<UserAttributes, 'id'>>,
    UserAttributes {}

export const userAttributes: ModelAttributes = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    unique: true
  },
  latestImage: {
    type: Sequelize.STRING(256),
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  // TODO: encryption here ?
  hashedPassword: {
    type: Sequelize.STRING(128),
    allowNull: false,
    set(password: string): void {
      this.setDataValue('hashedPassword', createHashedPassword(password));
    }
  },
  name: {
    type: Sequelize.STRING(128),
    allowNull: false,
    validate: {
      isAlphanumeric: true,
      len: [3, 128]
    }
  },
  email: {
    unique: true,
    allowNull: false,
    type: Sequelize.STRING(128),
    validate: {
      isEmail: true
    }
  }
};

export const User = sequelize.define<UserInstance>('user', userAttributes);
