import Sequelize, { Model, Optional } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from "src/database/engine";

interface UserAttributes {
  id: number;
  name: string;
  hashedPassword: string;
  latestImage: string;
}

class User
  extends Model<UserAttributes, Optional<UserAttributes, 'id'>>
  implements UserAttributes {
  id!: number;
  name!: string;
  hashedPassword!: string;
  latestImage!: string;

  get password() {
    return this.hashedPassword;
  }

  async setPassword(password: string) {
    this.hashedPassword = await bcrypt.hash(
      password,
      process.env.SALT_ROUNDS!
    );
  }

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  async isValidPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(this.password, password);
  }
}

User.init(
  {
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
  },
  {
    tableName: 'users',
    sequelize
  }
);
