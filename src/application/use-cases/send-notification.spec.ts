import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      content: 'Nova solicitação',
      category: 'social',
      recipientId: 'example-id',
    });

    const [persistedNotification] = notificationRepository.notifications;

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(persistedNotification).toEqual(notification);
  });
});
