import { Model, Sequelize, DataTypes } from 'sequelize';

import config from '../../../config/config';
import { IBuildUser } from '../../../user/models';
import { User } from '../../../user/models';

class UserRepo extends Model<User, IBuildUser> {
  id: number;
  email: string;
  username: string;
  balance: number;

  toModel(): User {
    return User.build({
      email: this.email,
      username: this.username,
      id: this.id,
      balance: this.balance
    });
  }

  static modelName = 'user';
  static initModel(sequelize: Sequelize) {
    return UserRepo.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING(1000),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(1000),
        allowNull: false
      },
      balance: {
        type: DataTypes.FLOAT,
        allowNull: true
      }
    },
      {
        sequelize,
        tableName: User.tableName,
        schema: config.db.schema,
        modelName: UserRepo.modelName,
        timestamps: false
      });
  }
  
  static associate(models) {
  }
}

export default UserRepo;
