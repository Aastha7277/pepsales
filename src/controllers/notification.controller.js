const { enqueueNotification } = require('../queues/producer');
const { getNotificationsByUser } = require('../services/notification.service');

const sendNotification = async (req, res) => {
  try {
    await enqueueNotification(req.body);
    res.status(202).json({ message: 'Notification queued for delivery.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to queue notification.' });
  }
};

const getUserNotifications = async (req, res) => {
  try {
    const notifications = await getNotificationsByUser(req.params.userId);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications.' });
  }
};

module.exports = { sendNotification, getUserNotifications };
