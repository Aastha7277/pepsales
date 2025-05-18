const amqp = require('amqplib');
const QUEUE_NAME = 'notifications';

const enqueueNotification = async (notification) => {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE_NAME);
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(notification)));
};

module.exports = { enqueueNotification };
