import { Model, Sequelize, DataTypes } from 'sequelize';

import config from '../../../config/config';
import { IBuildUser } from '../../../user/models';
import { User } from '../../../user/models';

class UserRepo extends Model<User, IBuildUser> {
  toModel(): User {
    return User.build({
      email: this.getDataValue('email') as string,
      username: this.getDataValue('username') as string,
      id: this.getDataValue('id') as number
    });
  }

  static modelName = 'user';
  static initModel(sequelize: Sequelize) {
    return UserRepo.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING(1000),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(1000),
        allowNull: false
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
