import { NotificationsRepository } from '@/domain/notification/application/repositories/notification-repository';
import { Notification } from '@/domain/notification/enterprise/entities/notification';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async findById(id: string) {
    const notification = this.notifications.find(
      (notification) => notification.id.toString() === id
    );

    return notification || null;
  }

  async save(notification: Notification) {
    this.notifications = this.notifications.map((n) =>
      n.id.toString() === notification.id.toString() ? notification : n
    );
  }
}
