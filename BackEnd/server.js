const express = require('express')
const app = express()
const port = 3000
const userrouter = require('./Routes/User');
const connect = require("./config/connect");
const postrouter = require("./Routes/Post");

connect()
app.get('/ping', (req,res) => {
    res.send('pong')
})

app.use(express.json());

app.use("/", userrouter);
app.use("/", postrouter);
app.listen(port, () => {
  console.log(`🚀 Server running on PORT: ${port}`);
});

module.exports = app;