import Sequelize, { Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from 'src/database/engine';

interface UserAttributes {
  id: number;
  name: string;
  password: string;
  latestImage: string;
}

class User
  extends Model<UserAttributes, Optional<UserAttributes, 'id'>>
  implements UserAttributes {
  id!: number;
  name!: string;
  private password!: string;
  latestImage!: string;

  get hashedPassword() {
    return this.password;
  }

  set hashedPassword(unencryptedPassword: string) {
    // TODO: Encrypt using Bcrypt.
    this.password = unencryptedPassword;
  }

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  isValidPassword(password: string): boolean {
    return bcrypt.compare(this.password, password);
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
    password: {
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

