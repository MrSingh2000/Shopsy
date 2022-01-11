const express = require('express')
const router = express.Router()
const User = require('../models/User');
// GET ACCESS TO env Variables
require('dotenv').config();
// fetchuser MIDDLEWARE
const fetchuser = require('../middleware/fetchuser');
// EXPRESS VALIDATOR
const { body, validationResult } = require('express-validator');
// PASSWORD ENCRYPTION
const bcrypt = require('bcryptjs');
// JSON WEB TOKEN 
const jwt = require('jsonwebtoken');
const jwtToken = process.env.JWT_SECRET;

// ROUTE 1: route to register ,with POST request, a new user
router.post('/register', [
    body('name', "Name field can't be Empty").exists(),
    body('mail', "Email Not valid").isEmail(),
    body('password', "Password length should be greater than 7").isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    let { name, mail, password } = req.body;
    try {
        // check if user already exists
        let user = await User.findOne({ mail: mail });
        if (user) {
            res.status(401).json({ error: "User already Exists" });
        }

        // encrypting the password
        let salt = await bcrypt.genSalt(10);
        let hashpass = await bcrypt.hash(password, salt);

        user = await User.create(
            {
                name, mail, password: hashpass
            }
        )
        user.save();
        // generating and sending auth token
        let data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtToken);

        res.json({ authToken });
    } catch (error) {
        res.json({ error: "Server Error Occured! Try again Later" });
    }

})

// ROUTE 2: login user with GET request
router.post('/login', [
    body('mail', "Email not valid").isEmail(),
    body('password', "Password should not be empty").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    let { mail, password } = req.body;
    try {
        // get user with the given mail
        let user = await User.findOne({ mail });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        // get the hashed password 
        let passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.json({ error: "Invalid Password" });
        }
        // generating and sending auth token
        let data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtToken);
        res.status(200).json({ authToken });
    } catch (err) {
        res.json({ error: "Server Error Occured! Try again Later" });
    }

});

// ROUTE 3: Get logged in user details
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.json({ error: "Server Error Occured! Try again Later" });
    }

});

module.exports = router;