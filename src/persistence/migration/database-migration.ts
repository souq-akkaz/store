import { Sequelize } from 'sequelize';
import { BrandTableMigration } from './brand-table.migration';
import { CategoryTableMigration } from './category-table.migration';
import { ProductTableMigration } from './product-table.migration';

import { UserTableMigration } from './user-table.migration';

export class DatabaseMigration {
  constructor(private _sequelize: Sequelize) {}

  async migrate(): Promise<void> {
    await Promise.all([
      new UserTableMigration(this._sequelize).createTable(),
      new BrandTableMigration(this._sequelize).createTable(),
      new CategoryTableMigration(this._sequelize).createTable(),
      new ProductTableMigration(this._sequelize).createTable()
    ]);
  }
}
