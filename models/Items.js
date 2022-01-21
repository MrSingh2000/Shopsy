const mongoose = require('mongoose');
const { Schema } = mongoose;

// DECLARING SCHEMA TO REGISTER AS AN ADMIN
const itemSchema = new Schema({
    name: {
        type: String
    },
    price: {
        type: String
    },
    image: {
        data: String,
        contentType: String
    },
    category: {
        type: String
    },
    info:{
        type: Map
    },
    seller:{
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    rating: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('item', itemSchema);