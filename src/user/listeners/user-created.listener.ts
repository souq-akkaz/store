import { inject, injectable } from 'inversify';
import { Message, Stan } from 'node-nats-streaming';

import { TYPES } from '../../di/injection-tokens';
import { AppEventListener, SubjectsEnum } from '../../core/models';
import UserRepo from '../../persistence/database/repositories/user.repository';
import { generateNumberFrom150 } from '../../helpers/functions';

interface IUserCreatedEvent {
  subject: SubjectsEnum.USER_CREATED,
  data: {
    userId: number;
    username: string;
    email: string;
  }
}

@injectable()
export class UserCreatedEventListener extends AppEventListener<IUserCreatedEvent> {
  subject = SubjectsEnum.USER_CREATED;
  queueGroupName = 'store-service';
  constructor(
    @inject(TYPES.StanClient)
    _stan: Stan
  ) {
    super(_stan);
  }

  async onMessage(data: IUserCreatedEvent['data'], msg: Message) {
    try {
      const createdUser = await UserRepo.create({
        email: data.email,
        username: data.username,
        id: data.userId,
        balance: generateNumberFrom150(1058)
      });
      console.log(`New user created with id ${createdUser.id}`);
      msg.ack();
    } catch (exc) {
      console.error(exc);
    }
  }
}
