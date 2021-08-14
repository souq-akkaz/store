import _ from 'lodash';
import { FindAndCountOptions, FindOptions, Op, WhereOptions } from 'sequelize';

import { Product } from '../../core/models';

interface IProductSearchCriteria {
  pageIndex: number;
  pageSize: number;
  searchTerm?: string;
  categoryId?: number;
  brandId?: number;
}

export class ProductSearch {
  pageIndex: number;
  pageSize: number;
  searchTerm: string;
  categoryId: number;
  brandId: number;

  constructor(criteria: IProductSearchCriteria) {
    this.pageIndex = criteria.pageIndex;
    this.pageSize = criteria.pageSize;
    this.searchTerm = criteria.searchTerm;
    this.categoryId = criteria.categoryId;
    this.brandId = criteria.brandId;
  }

  toSequelizeFindOption(): FindAndCountOptions<Product> {
    const findOptions: FindAndCountOptions<Product> = {
      limit: this.pageSize,
      offset: this.pageSize * this.pageIndex
    };
    const where: WhereOptions<Product> = { };

    if (_.isString(this.searchTerm) && !_.isEmpty(this.searchTerm)) {
      where.name = { [Op.like]: `%${this.searchTerm}%` };
    }
    if (!_.isEmpty(this.categoryId) && _.isNumber(this.categoryId)) {
      where.categoryId = this.categoryId;
    }
    if (!_.isEmpty(this.brandId) && _.isNumber(this.brandId)) {
      where.brandId = this.brandId;
    }

    findOptions.where = where;
    return findOptions;
  }
}