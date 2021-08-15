import { injectable } from 'inversify';
import { Message, Stan } from 'node-nats-streaming';
import { SubjectsEnum } from './event-listener-type.enum';

interface IEvent {
  subject: SubjectsEnum;
  data: any;
} 
@injectable()
export abstract class AppEventListener<T extends IEvent> {
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], message: Message): void;
  protected ackWait = 5 * 1000;

  private _client: Stan;
  constructor(stan: Stan) {
    this._client = stan;
  }

  subscriptionOptions() {
    return this._client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this._client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );
    subscription.on('message', (msg: Message) => {
      const parsedMessage = this.parseMessage(msg);

      this.onMessage(parsedMessage, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}
