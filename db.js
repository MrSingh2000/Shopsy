const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

const connectToMongo = () => {
    console.log(mongoURI);
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("DB connected!");
        })
        .catch((error) => {
            console.log("DB error: ", error);
        })
};

module.exports = connectToMongo;