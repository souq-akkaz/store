import { Sequelize } from 'sequelize';

import config from '../../config/config';
import { TableMigration } from './table-migration';
import { Brand } from '../../product/models';

export class BrandTableMigration extends TableMigration {
  tableName = Brand.tableName;
  schema = config.db.schema;
  constructor(protected sequelzie: Sequelize) {
    super(sequelzie);
  }

  async createTable(): Promise<void> {
    await this.sequelize.query(`
      CREATE TABLE ${this.tableNameWithSchema} (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(1000) NOT NULL
      )
    `);
  }
}
