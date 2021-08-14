import { Express } from 'express';

import { apiV1 } from '../helpers/functions';
import productRouterV1 from './store.router';

const setupRoutes = (app: Express): void => {
  apiV1(app, productRouterV1, 'product');
};

export default setupRoutes;
