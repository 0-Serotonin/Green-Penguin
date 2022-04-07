const mongoose = require('mongoose')
const Schema = mongoose.Schema

const threadSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },

    userID: {
        type: Number,
        require: true
    },
    user:{
        type: String,
        require: true
    }

},{timestamps: true })

const Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread