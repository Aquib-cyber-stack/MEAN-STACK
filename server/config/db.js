const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
    try {
        if (!config.MONGO_URI) {
            throw new Error("MONGO_URI is undefined. Check your Render Environment Variables.");
        }
        
        const conn = await mongoose.connect(config.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
