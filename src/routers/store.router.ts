import { Router } from 'express';

import handleRoute from '../helpers/functions/handle-route.fn';
import diContainer from '../di/di-container';
import { ProductController } from '../product/controllers/product.controller';

const productController = diContainer.resolve(ProductController);
const productRouterV1 = Router();

productRouterV1.get('/search', handleRoute(productController.search));

export default productRouterV1;
