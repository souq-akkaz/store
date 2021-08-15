import { Container } from 'inversify';

import { ProductService } from '../product/services/product.service';
import { ProductController } from '../product/controllers/product.controller';
import { TYPES } from './injection-tokens';
import { UserCreatedEventListener } from '../user/listeners/user-created.listener';
import { UserController } from '../user/controllers/user.controller';
import { UserService } from '../user/services/user.service';

const diContainer = new Container();

diContainer.bind<ProductController>(TYPES.ProductController).to(ProductController).inSingletonScope();
diContainer.bind<ProductService>(TYPES.ProductService).to(ProductService).inSingletonScope();

diContainer.bind<UserCreatedEventListener>(TYPES.UserCreatedEventListener).to(UserCreatedEventListener).inSingletonScope();
diContainer.bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();
diContainer.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();

export default diContainer;
