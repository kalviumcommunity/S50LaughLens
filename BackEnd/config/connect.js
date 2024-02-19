const mongoose = require('mongoose')
require("dotenv").config()
const url = process.env.MongoUri

const connectDB = () => {
    mongoose.connect(url);
    mongoose.connection.on('error',(err) => {
        console.error('MongoDB connection error:', err);
    });

    mongoose.connection.once('open',() =>{
        console.log("MongoDB connected successful");
    });
};
module.exports = connectDB;
