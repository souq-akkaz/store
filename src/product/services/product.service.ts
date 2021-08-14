import { injectable } from 'inversify';

import { Product } from '../../core/models';
import { mapToModel } from '../../helpers/functions';
import { PagedList } from '../../helpers/pagination';
import ProductRepo from '../../persistence/database/repositories/product.repository';
import { ProductSearch } from '../models/product-search.model';

interface IProductSearch {
  searchTerm?: string;
  pageSize: number;
  pageIndex: number;
  categoryId?: number;
  brandId?: number;
}
@injectable()
export class ProductService {
  search = async (searchCriteria: IProductSearch): Promise<PagedList<Product>> => {
    const criteria = new ProductSearch({
      pageIndex: searchCriteria.pageIndex,
      pageSize: searchCriteria.pageSize,
      searchTerm: searchCriteria.searchTerm
    });

    const { rows, count } = await ProductRepo.findAndCountAll(criteria.toSequelizeFindOption());
    return PagedList.build({
      collection: mapToModel(rows),
      pageIndex: searchCriteria.pageIndex,
      pageSize: searchCriteria.pageSize,
      totalCount: count
    });
  }
}