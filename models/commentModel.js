const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    comment:{
        type: String,
        require: true
    },
    threadId:{
        type: mongoose.Schema.ObjectId, 
        ref: "Thread"
    },
    responseTo:{
        type: mongoose.Schema.ObjectId,
        ref: "Comment"
    }, 
    userID:{
        type: Number,
        require: true
    },
    user:{
        type: String,
        require: true
    }
},{timestamps: true })

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment