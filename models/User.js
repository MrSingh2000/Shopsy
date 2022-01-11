const mongoose = require('mongoose');
const { Schema } = mongoose;

// DECLARING SCHEMA TO REGISTER AS AN ADMIN
const userSchema = new Schema({
    name: {
        type: String
    },
    mail: {
        type: String,
        unique: true
    },
    password: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', userSchema);