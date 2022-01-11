const express = require('express');
const router = express.Router();
const Item = require('../models/Items');
const User = require('../models/User');
// GET ACCESS TO env Variables
require('dotenv').config();
// THIS IS NEEDED TO PARSE SEARCH, PATHNAME, QUERY parameters FROM THE URL
const url = require('url');

// ROUTE 1: get products on the basis of category
// (NOTE: putting this route at last caused some issues with mongoose `convertion to mongoID` or something like that, got it fixed when shifted it above)
router.get('/filter', async (req, res) => {
    try {
        // the JS object containing all the respective keys from the url
        let obj = url.parse(req.url, true);
        // get the query parameter from the url
        let category = obj.query.category;
        let items = await Item.find({category});
        res.json({items});
    } catch (error) {
        console.log("I am here");
        res.json({error});
    }
});

// ROUTE 2: get all products
router.get('/allproducts', async (req, res) => {
    try {
        let products = await Item.find({}, { name: 1, price: 1, image: 1, });
        res.json({ products });
    } catch (error) {
        res.json({ error });
    }
});

// ROUTE 3: get a particular product details
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let product = await Item.findById(id);
        // check if product exists
        if (!product) {
            res.status(404).json({ error: "Product not found" });
        }
        // send the product
        res.json(product);
    } catch (error) {
        res.json({ error });
    }
});




module.exports = router;