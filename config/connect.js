const mongoose = require('mongoose')

require("dotenv").config()

const url = process.env.MongoUri

const connectDB = () =>{
    mongoose.connect(url)
    .then(()=>{
        console.log("db is connected")
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports = connectDB;