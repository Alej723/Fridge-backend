const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Debug logging to see what Railway has
    console.log('=== DATABASE CONNECTION DEBUG ===');
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
    console.log('MONGODB_URI value:', process.env.MONGODB_URI ? 'SET (hidden for security)' : 'UNDEFINED');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    // Check if MONGODB_URI is actually defined
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not defined in environment variables!');
      console.log('Available MONGO-related env vars:', Object.keys(process.env).filter(key => key.includes('MONGO')));
      throw new Error('MONGODB_URI environment variable is not set');
    }
    
    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✅ Database: ${conn.connection.db.databaseName}`);
    console.log('=================================');
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
