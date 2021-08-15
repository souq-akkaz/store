import { TYPES } from '../di/injection-tokens';
import diContainer from '../di/di-container';
import { UserCreatedEventListener } from '../user/listeners/user-created.listener';
import { AppEventListener } from '../core/models';

const initListeners = () => {
  const UserCreatedEventListener = diContainer.get(TYPES.UserCreatedEventListener) as UserCreatedEventListener;

  const listeners: AppEventListener<any>[] = [UserCreatedEventListener];

  for (const listener of listeners) {
    listener.listen();
  }
};

export default initListeners;
