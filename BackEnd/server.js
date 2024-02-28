const express = require('express')
const app = express()
const port = 3001
const userrouter = require('./Routes/User');
const connect = require("./config/connect");
const postrouter = require("./Routes/Post");
const cors = require("cors");
app.use(cors())

connect()
app.get('/ping', (req,res) => {
    res.send('pong')
})

app.use(express.json());

app.use("/users", userrouter);
app.use("/posts", postrouter);
app.listen(port, () => {
  console.log(`🚀 Server running on PORT: ${port}`);
});

module.exports = app;
