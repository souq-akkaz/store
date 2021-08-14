import { Sequelize } from 'sequelize';

import config from '../../config/config';
import { TableMigration } from './table-migration';
import { Product } from '../../core/models';
import { Brand, Category } from '../../product/models';

export class ProductTableMigration extends TableMigration {
  tableName = Product.tableName;
  schema = config.db.schema;
  constructor(protected sequelzie: Sequelize) {
    super(sequelzie);
  }

  async createTable(): Promise<void> {
    await this.sequelize.query(`
      CREATE TABLE ${this.tableNameWithSchema} (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(1000) NOT NULL,
        price INT NOT NULL,
        categoryId INT NULL,
        brandId INT NULL,
        CONSTRAINT FK_ProductBrand FOREIGN KEY (brandId)
        REFERENCES ${Brand.tableName}(id),
        CONSTRAINT FK_ProductCategory FOREIGN KEY (categoryId)
        REFERENCES ${Category.tableName}(id)
      )
    `);
  }
}
