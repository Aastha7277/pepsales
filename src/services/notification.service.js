const nodemailer = require('nodemailer');
const twilio = require('twilio');
const { v4: uuidv4 } = require('uuid');

// Fake DB
const inAppNotifications = [];

const sendEmail = async ({ to, subject, message }) => {

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  await transporter.sendMail({
    from: `"Notifier" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: message,
  }).then(() => {
    console.log('📧 Email sent successfully');
  }).catch((error) => {
    console.error('❌ Error sending email:', error);
  });
};

const sendSMS = async ({ to, message }) => {
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE,
    to,
  }).then(() => {
    console.log('📱 SMS sent successfully');
  })
};

const saveInAppNotification = async ({ userId, message }) => {
  inAppNotifications.push({ id: uuidv4(), userId, message, date: new Date() });
};

const getNotificationsByUser = async (userId) => {
  return inAppNotifications.filter(n => n.userId === userId);
};

module.exports = { sendEmail, sendSMS, saveInAppNotification, getNotificationsByUser };
