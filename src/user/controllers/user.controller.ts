import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import _ from 'lodash';

import getCurrentUser from '../../helpers/current-user/get-current-user.fn';
import { TYPES } from '../../di/injection-tokens';
import { UserService } from '../services/user.service';

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.UserService)
    private _userService: UserService
  ) {}

  getUserBalance = async (req: Request, res: Response) => {
    const { currentUserId } = getCurrentUser(req.headers);
    const userBalance = await this._userService.getUserBalance(currentUserId);

    res.json({ balance: userBalance });
  };
}
