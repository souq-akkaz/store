import { Router } from 'express';

import handleRoute from '../helpers/functions/handle-route.fn';
import diContainer from '../di/di-container';
import { UserController } from '../user/controllers/user.controller';

const userController = diContainer.resolve(UserController);
const userRouterV1 = Router();

userRouterV1.get('/balance', handleRoute(userController.getUserBalance));

export default userRouterV1;
