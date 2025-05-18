const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB using Mongoose');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB using Mongoose:', error);
    throw error;
  }
};

module.exports = {
  connectToMongoDB,
};