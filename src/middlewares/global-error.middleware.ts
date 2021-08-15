import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../core/exceptions';

const errorGlobalHandlerMiddleware = (error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res
    .status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR)
    .send(error);
};

export default errorGlobalHandlerMiddleware;
