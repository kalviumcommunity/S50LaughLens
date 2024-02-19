const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    PostId: {
        type: Number,
        required: true,
        unique:true
    },
    UserId: {
        type: Number,
        required: true,
        unique:true
    },
    File: {
        type: String,
        required: true
    },
    Likes: {
        type: Number,
        required: true
    },
    Comments: {
        type: Number,
        required: true
    },
    Shares: {
        type: Number,
        required: true
    }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;