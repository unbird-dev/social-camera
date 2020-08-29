import Sequelize, { Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from 'src/database/engine';
import { InitOptions, ModelAttributes, ModelStatic } from "sequelize/types/lib/model";

interface UserAttributes {
  id: number;
  name: string;
  hashedPassword: string;
  latestImage: string;
}

export class User
  extends Model<UserAttributes, Optional<UserAttributes, 'id'>>
  implements UserAttributes {
  id!: number;
  name!: string;
  hashedPassword!: string;
  latestImage!: string;

  get password(): string {
    return this.hashedPassword;
  }

  async setPassword(password: string): Promise<void> {
    this.hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS!);
  }

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  async isValidPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(this.password, password);
  }

  static attributes = {
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
      allowNull: false
    },
    name: {
      unique: true,
      type: Sequelize.STRING(128),
      allowNull: false
    }
  };

  static tableName = 'users';
}

User.init(User.attributes, {
  tableName: User.tableName,
  sequelize
});
