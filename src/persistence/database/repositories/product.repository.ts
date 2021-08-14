import { Model, Sequelize, DataTypes } from 'sequelize';

import config from '../../../config/config';
import { Product, IBuildProduct } from '../../../core/models';
import CategoryRepo from './category.repository';
import BrandRepo from './brand.repository';

class ProductRepo extends Model<Product, IBuildProduct> {
  toModel(): Product {
    return Product.build({
      id: this.getDataValue('id'),
      name: this.getDataValue('name'),
      price: this.getDataValue('price'),
      categoryId: this.getDataValue('categoryId'),
      brandId: this.getDataValue('brandId'),
      brand: this.getDataValue('brand') || null,
      category: this.getDataValue('category') || null
    });
  }

  static modelName = 'product';
  static initModel(sequelize: Sequelize) {
    return ProductRepo.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(1000),
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      brandId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
      {
        sequelize,
        tableName: Product.tableName,
        schema: config.db.schema,
        modelName: ProductRepo.modelName,
        timestamps: false
      });
  }

  static associate(models) {
    const categoryRepo = models[CategoryRepo.modelName] as typeof CategoryRepo;
    const brandRepo = models[BrandRepo.modelName] as typeof BrandRepo;
    this.belongsTo(categoryRepo, { foreignKey: 'categoryId' });
    this.belongsTo(brandRepo, { foreignKey: 'brandId' });
  }
}

export default ProductRepo;
