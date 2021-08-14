import { Model, Sequelize, DataTypes } from 'sequelize';

import config from '../../../config/config';
import { Category, IBuildCategory } from '../../../product/models';
import ProductRepo from './product.repository';

class CategoryRepo extends Model<Category, IBuildCategory> {
  toModel(): Category {
    return Category.build({
      name: this.getDataValue('name') as string,
      id: this.getDataValue('id') as number
    });
  }

  static modelName = 'category';
  static initModel(sequelize: Sequelize) {
    return CategoryRepo.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(1000),
        allowNull: false
      }
    },
      {
        sequelize,
        tableName: Category.tableName,
        schema: config.db.schema,
        modelName: CategoryRepo.modelName,
        timestamps: false
      });
  }

  static associate(models) {
    const productRepo = models[ProductRepo.modelName] as typeof ProductRepo;
    this.hasMany(productRepo, { foreignKey: 'categoryId' });
  }
}

export default CategoryRepo;
