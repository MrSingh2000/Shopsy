const express = require('express');
const router = express.Router();
const Item = require('../models/Items');
const User = require('../models/User');
const Comment = require('../models/Comment');
// EXPRESS VALIDATOR
const { body, validationResult } = require('express-validator');
// GET ACCESS TO env Variables
require('dotenv').config();
// fetchuser MIDDLEWARE
const fetchuser = require('../middleware/fetchuser');
// convert string to relevant object id
const mongoose = require('mongoose');


// ROUTE 1: submit a comment with POST request
router.post('/submit/:id', fetchuser, [
    body('star', 'Please send a valid number of stars').exists(),
    body('title', 'Title must be more than 3 chars').isLength({ min: 3 }),
    body('review', 'Review length must be more than 10 chars').isLength({ min: 10 }),
], async (req, res) => {
    // check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // checking if user is valid and registered on database
    let user = await User.findById(req.user.id);
    if (!user) {
        res.status(404).json({ error: "user not found" });
    }
    let productId = req.params.id;
    // checking if product corresponding to the product id Exists
    let product = await Item.findById(productId);
    if (!product) {
        res.json({ error: "Product Not Found" });
    }

    // Saving the Comment
    let { star, review, title } = req.body;
    let comment = await Comment.create({
        title, review, star,
        userId: user.id,
        itemId: productId,
        userName: user.name
    })
    comment.save();

    // Calculating new Ratings for the product after addition of the comment
    let newRatingArray = await Comment.aggregate(
        [
            {
                $group:
                {
                    _id: "$itemId",
                    count: { $sum: "$star" },
                }
            }
        ]
    );
    let objId = mongoose.Types.ObjectId(productId);
    let totalComments = await Comment.find({ itemId: objId }).count();
    let newRating = 0;
    for (let i of newRatingArray) {
        if (i._id.toString() === productId) {
            newRating = i.count;
            break;
        }
    }
    // this is the final average rating
    newRating /= totalComments;

    // updating the rating of the product
    await Item.updateOne({
        _id: objId
    }, {
        $set: { "rating": newRating }
    });

    res.json({ comment });
});

// ROUTE 2: get all the comments of a particular product
router.get('/all/:id', async (req, res) => {
    try {
        // get product-id from the url parameters
        let productId = req.params.id;
        // verifying if product exists
        let product = await Item.findById(productId);
        if (!product) {
            res.json({ error: "Product Doesn't Exists" });
            return;
        }
        let objId = mongoose.Types.ObjectId(productId);
        let comments = await Comment.find({ itemId: objId });
        res.json(comments);
    } catch (error) {
        res.send("Server Error Try again Later!");
    }
});

module.exports = router;