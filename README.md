Here’s a **production-ready `README.md`** file for your Notification Service project based on your setup script (`noti.sh`) and implementation:

---

```markdown
# 📬 Notification Service

A Node.js microservice to handle **Email**, **SMS**, and **In-App** notifications using **RabbitMQ** for async processing. Built with:

- Express.js
- Nodemailer (Email)
- Twilio (SMS)
- RabbitMQ (Message Queue)
- dotenv (Config management)
- UUID (Notification IDs)

---

## 📁 Project Structure

```

notification-service/
├── src/
│   ├── config/             # Reserved for future configs
│   ├── controllers/        # Route logic
│   ├── queues/             # RabbitMQ producer & consumer
│   ├── routes/             # Express routes
│   ├── services/           # Email, SMS, In-App logic
│   ├── utils/              # Utilities (if any)
│   ├── app.js              # Express config
│   └── server.js           # Starts the server
├── .env                    # Environment variables
├── .gitignore              # Ignores node\_modules, .env
├── package.json
└── README.md

````

---

## 🚀 Features

- Queue-based message handling (using RabbitMQ)
- Email notifications via SMTP (Gmail/Ethereal)
- SMS notifications via Twilio
- In-App message simulation
- Easy to extend with more types or integrations

---

## 🔧 Setup & Installation

```bash
# 1. Clone or run setup script
git clone <repo_url> && cd notification-service

# OR if you already have noti.sh
bash noti.sh

# 2. Install dependencies
npm install

# 3. Fill in environment variables
cp .env .env.local
````

Edit `.env.local` and set:

```env
# Server
PORT=5000

# Email Config
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_SERVICE=gmail

# Twilio
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE=+1234567890

# RabbitMQ
RABBITMQ_URL=amqp://localhost
```

---

## 🛠 Running the Services

Open two terminal windows:

### 1️⃣ Start Express API

```bash
npm run start:api
```

### 2️⃣ Start RabbitMQ Consumer Worker

```bash
npm run start:consumer
```

---

## 🧪 Sample API Request

**POST** `/notifications`

```
POST http://localhost:5000/notifications
Content-Type: application/json
```

### Example Request Body (Email):

```json
{
  "type": "email",
  "to": "recipient@example.com",
  "subject": "Test Email",
  "message": "Hello from the Notification Service!"
}
```

### Example Request Body (SMS):

```json
{
  "type": "sms",
  "to": "+1234567890",
  "message": "This is a test SMS."
}
```

### Example Request Body (In-App):

```json
{
  "type": "in-app",
  "userId": "user-001",
  "message": "Your order has been shipped!"
}
```

---

## 📬 Get User Notifications (In-App)

**GET** `/notifications/:userId`

```http
GET http://localhost:5000/notifications/user-001
```

---

## 🐇 RabbitMQ Setup

Ensure RabbitMQ is running locally:

```bash
docker run -d --hostname rabbitmq --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

Access RabbitMQ UI at: [http://localhost:15672](http://localhost:15672)
(Default credentials: `guest` / `guest`)

---

## 📌 Notes

* Gmail now requires [App Passwords](https://support.google.com/accounts/answer/185833) if 2FA is enabled.
* SMS delivery works only if Twilio account is configured and verified properly.
* In-App notifications are currently stored in memory. Extend with a DB like MongoDB/PostgreSQL for persistence.

---

## 📜 License

MIT © Aastha Kumari

```

