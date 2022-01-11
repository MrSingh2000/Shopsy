const mongoose = require('mongoose');
const { Schema } = mongoose;

// DECLARING SCHEMA TO REGISTER AS AN ADMIN
const commentSchema = new Schema({
    star: {
        type: Number
    },
    review: {
        type: String
    },
    title: {
        type: String
    },
    userName: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item'
    },
});

module.exports = mongoose.model('comment', commentSchema);