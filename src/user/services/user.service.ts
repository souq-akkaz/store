import { injectable } from 'inversify';

import { NotFoundError } from '../../core/exceptions';
import UserRepo from '../../persistence/database/repositories/user.repository';

@injectable()
export class UserService {
  getUserBalance = async (userId: number): Promise<number> => {
    const user = await UserRepo.findByPk(userId, { attributes: ['id', 'balance'] });
    if (!user) {
      throw new NotFoundError(
        'Trying to get balance of user that is not exists',
        'errors.store.getUserbalance.userNotFound',
        'GUBNT_FZQ'
      );
    }
    return user.balance;
  }
}