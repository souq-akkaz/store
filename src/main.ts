import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import { Stan } from 'node-nats-streaming';

import diContainer from './di/di-container';
import { TYPES } from './di/injection-tokens';
import establishMessageBrokerConection from './nats/connect';
diContainer
  .bind<Stan>(TYPES.StanClient)
  .toConstantValue(establishMessageBrokerConection());

import config from './config/config';
import database from './persistence/database/database';
import errorGlobalHandlerMiddleware from './middlewares/global-error.middleware';
import setupRoutes from './routers';
import { ProductService } from './product/services/product.service';

dotenv.config({ path: process.env.NODE_ENV == 'production' ? '.env' : 'dev.env' });

const establishDatabaseConnection = async () => {
  await database.connect({
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: +process.env.MYSQL_PORT
  })
  .authenticate();
  await database.sequelize.sync({ alter: true });
};



const bootstrap = async () => {
  const app = express();

  app.use(cors());
  app.disable('x-powered-by');
  app.use(morgan('dev'));
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.contentSecurityPolicy());
  app.use(compression());

  await establishDatabaseConnection();

  const stanClient = diContainer.get(TYPES.StanClient) as Stan;
  const productService = diContainer.resolve(ProductService);
  productService.insertPreSetData();

  app.get('/health', (req, res) => res.json({ healthy: true }));
  setupRoutes(app);
  app.use(errorGlobalHandlerMiddleware);

  app.listen(
    config.port,
    () => console.log(`app listening on port ${config.port}`)
  );
};

bootstrap();
