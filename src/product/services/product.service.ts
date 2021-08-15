import { injectable } from 'inversify';

import BrandRepo from '../../persistence/database/repositories/brand.repository';
import CategoryRepo from '../../persistence/database/repositories/category.repository';
import { Product } from '../../core/models';
import { mapToModel } from '../../helpers/functions';
import { PagedList } from '../../helpers/pagination';
import ProductRepo from '../../persistence/database/repositories/product.repository';
import { PRE_SET_BRANDS, PRE_SET_CATEGORIES, PRE_SET_PRODUCTS } from '../controllers/pre-set-values.constant';
import { Brand, Category } from '../models';
import { ProductSearch } from '../models/product-search.model';
import _ from 'lodash';

interface IProductSearch {
  searchTerm?: string;
  pageSize: number;
  pageIndex: number;
  categoryId?: number;
  brandId?: number;
}
@injectable()
export class ProductService {
  insertPreSetData = async () => {
    const categories = PRE_SET_CATEGORIES.map((name) => Category.build({ name }));
    const brands = PRE_SET_BRANDS.map((name) => Brand.build({ name }));
    const [noCategories, noBrands, noProdcuts] = await Promise.all([
      CategoryRepo.findAll({ limit: 1 }).then((x) => _.isEmpty(x)),
      BrandRepo.findAll({ limit: 1 }).then((x) => _.isEmpty(x)),
      ProductRepo.findAll({ limit: 1 }).then((x) => _.isEmpty(x))
    ]);

    if (noCategories) {
      CategoryRepo.bulkCreate(categories);
    }
    if (noBrands) {
      BrandRepo.bulkCreate(brands);
    }
    if (noProdcuts) {
      ProductRepo.bulkCreate(
        PRE_SET_PRODUCTS.map(({ name, brandId, categoryId, price }) => Product.build({
          name,
          price,
          brandId: +brandId,
          categoryId: +categoryId
        }))
      );
    }
  };

  search = async (searchCriteria: IProductSearch): Promise<PagedList<Product>> => {
    const criteria = new ProductSearch({
      pageIndex: searchCriteria.pageIndex,
      pageSize: searchCriteria.pageSize,
      searchTerm: searchCriteria.searchTerm
    });
    console.log(criteria.toSequelizeFindOption());
    const { rows, count } = await ProductRepo.findAndCountAll({
      ...criteria.toSequelizeFindOption(),
      include: [
        { model: CategoryRepo },
        { model: BrandRepo }
      ]
    });
    return PagedList.build({
      collection: mapToModel(rows),
      pageIndex: searchCriteria.pageIndex,
      pageSize: searchCriteria.pageSize,
      totalCount: count
    });
  }
}