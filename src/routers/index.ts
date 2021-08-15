import { Express } from 'express';

import { apiV1 } from '../helpers/functions';
import productRouterV1 from './store.router';
import userRouterV1 from './user.router';

const setupRoutes = (app: Express): void => {
  apiV1(app, productRouterV1, 'product');
  apiV1(app, userRouterV1, 'user');
};

export default setupRoutes;
