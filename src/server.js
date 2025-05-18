require('dotenv').config();
const express = require('express');
const notificationRoutes = require('./routes/notification.routes');

const app = express();
const { connectToMongoDB } = require('./config/dbconfig');

connectToMongoDB();

app.use(express.json());
app.use('/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
