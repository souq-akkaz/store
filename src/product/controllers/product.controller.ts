import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../di/injection-tokens';
import getCurrentUser from '../../helpers/current-user/get-current-user.fn';
import getPaginationObject from '../../helpers/pagination/get-pagination-object.fn';
import { ProductService } from '../services/product.service';

@injectable()
export class ProductController {
  constructor(
    @inject(TYPES.ProductService)
    private _productService: ProductService
  ) {}

  search = async (req: Request, res: Response) => {
    const pagination = getPaginationObject(req.query);
    const currentUser = getCurrentUser(req.headers);
    const searchTerm = req.query.searchTerm as string;
    const products = await this._productService.search({
      searchTerm,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize
    });
    res.send(products);
  }
}