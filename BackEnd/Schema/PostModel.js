const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    File: {
        type: String,
        required: true
    },
    Caption: {
        type: String, 
        default: ""
    },
    Likes: {
        type: Number,
        default: 0 
    },
    Comments: {
        type: Number,
        default: 0 
    },
    Shares: {
        type: Number,
        default: 0 
    }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
