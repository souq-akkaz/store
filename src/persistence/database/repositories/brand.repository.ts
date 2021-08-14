import { Model, Sequelize, DataTypes } from 'sequelize';

import config from '../../../config/config';
import { Brand, IBuildBrand } from '../../../product/models';
import ProductRepo from './product.repository';

class BrandRepo extends Model<Brand, IBuildBrand> {
  toModel(): Brand {
    return Brand.build({
      name: this.getDataValue('name') as string,
      id: this.getDataValue('id') as number
    });
  }

  static modelName = 'brand';
  static initModel(sequelize: Sequelize) {
    return BrandRepo.init({
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
        tableName: Brand.tableName,
        schema: config.db.schema,
        modelName: BrandRepo.modelName,
        timestamps: false
      });
  }

  static associate(models) {
    const productRepo = models[ProductRepo.modelName] as typeof ProductRepo;
    this.hasMany(productRepo, { foreignKey: 'brandId' });
  }
}

export default BrandRepo;

