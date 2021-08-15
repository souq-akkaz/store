import { Container } from 'inversify';

import { ProductService } from '../product/services/product.service';
import { ProductController } from '../product/controllers/product.controller';
import { TYPES } from './injection-tokens';
import { UserCreatedEventListener } from '../user/listeners/user-created.listener';

const diContainer = new Container();

diContainer.bind<ProductController>(TYPES.ProductController).to(ProductController).inSingletonScope();
diContainer.bind<ProductService>(TYPES.ProductService).to(ProductService).inSingletonScope();
diContainer.bind<UserCreatedEventListener>(TYPES.UserCreatedEventListener).to(UserCreatedEventListener).inSingletonScope();

export default diContainer;
