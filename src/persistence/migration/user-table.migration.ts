import { Sequelize } from 'sequelize';

import { User } from '../../user/models';
import config from '../../config/config';
import { TableMigration } from './table-migration';

export class UserTableMigration extends TableMigration {
  tableName = User.tableName;
  schema = config.db.schema;
  constructor(protected sequelzie: Sequelize) {
    super(sequelzie);
  }

  async createTable(): Promise<void> {
    this.sequelize.query(`
      CREATE TABLE ${this.tableNameWithSchema} (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(1000) NOT NULL,
        email VARCHAR(1000) NOT NULL
      )
    `);
  }
}
