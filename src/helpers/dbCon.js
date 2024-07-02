const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();
const connectDB = async () => {
    try {
        const url = process.env.DB_URI;
        await mongoose.connect(url);
        console.log('database connected');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}

module.exports = connectDB;