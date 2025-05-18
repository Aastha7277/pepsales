require('dotenv').config();
const amqp = require('amqplib');
const {
  sendEmail,
  sendSMS,
  saveInAppNotification
} = require('../services/notification.service');

const QUEUE_NAME = 'notifications';

(async () => {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  console.log('📥 Waiting for messages...');
  channel.consume(QUEUE_NAME, async (msg) => {
    if (msg !== null) {
      const notification = JSON.parse(msg.content.toString());

      try {
        // Normalize and deduplicate types
        const rawTypes = Array.isArray(notification.type)
          ? notification.type
          : [notification.type];

        const types = [...new Set(rawTypes.map(type => type.toLowerCase()))];

        // Process each unique type
        for (const type of types) {
          switch (type) {
            case 'email':
              await sendEmail(notification);
              break;
            case 'sms':
              await sendSMS(notification);
              break;
            case 'in-app':
              await saveInAppNotification(notification);
              break;
            default:
              console.warn(`⚠️ Unknown notification type: ${type}`);
          }
        }

        channel.ack(msg);
      } catch (err) {
        console.error('❌ Error processing notification:', err.message);
        setTimeout(() => {
          channel.nack(msg, false, true); // requeue the message
        }, 3000);
      }
    }
  });
})();