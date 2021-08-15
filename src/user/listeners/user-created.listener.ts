import { inject, injectable } from 'inversify';
import { Message, Stan } from 'node-nats-streaming';

import { TYPES } from '../../di/injection-tokens';
import { AppEventListener, SubjectsEnum } from '../../core/models';

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

  onMessage(data: IUserCreatedEvent['data'], msg: Message) {
    console.log(data);
  }
}
