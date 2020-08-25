
import Notification from '../infra/typeorm/schemas/Notification';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}