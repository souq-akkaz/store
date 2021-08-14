import { Container } from 'inversify';

import { ProductService } from '../product/services/product.service';
import { ProductController } from '../product/controllers/product.controller';
import { TYPES } from './injection-tokens';

const diContainer = new Container();

diContainer.bind<ProductController>(TYPES.ProductController).to(ProductController).inSingletonScope();
diContainer.bind<ProductService>(TYPES.ProductService).to(ProductService).inSingletonScope();

export default diContainer;
