const express = require('express');
require('dotenv').config();
const router = express.Router();
const Item = require('../models/Items');
const User = require('../models/User');
// for changing File Stream to a usable file
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
// EXPRESS VALIDATOR
const { body, validationResult } = require('express-validator');
// for changing id to new Object type
const mongoose = require('mongoose');
// GET ACCESS TO env Variables
require('dotenv').config();
// fetchuser MIDDLEWARE
const fetchuser = require('../middleware/fetchuser');
// multer for file handling
const multer = require('multer');

// TO STORE THE DATA ON DISK STORAGE
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, `${__dirname}/uploads`)
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });

// TO STORE THE DATA ON MEMORY AND NOT ON DISK
var storage = multer.memoryStorage();

var upload = multer({ storage: storage });

// promised function to make a file from recieved buffer (Not used in our backend)
let makeFile = (fileName, image) => {
    return new Promise((resolve, reject) => {
        try {
            fs.writeFile(`${__dirname}/../uploads/${fileName}`, image, async (err) => {
                console.log(err);
            });
            resolve();
        } catch (error) {
            reject();
        }
    })
}


// ROUTE 1: Route to Add an Item with POST method
router.post('/add', [upload.single('image'), fetchuser], async (req, res) => {
    try {
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
        // get all required variables
        let { name, price, info, seller, category } = JSON.parse(req.body.product);

        // get image form req.file and other content from req.body (this is due to multer)
        // let image = req.file;


        // WE CAN USE THIS CODE TO CONVERT THE BUFFER TO A FILE AND STORE IT (but i am not using this for now)
        // IF WE WANT TO SEND THE IMAGE DIRECTLY TO ANY CLOUD BUCKET FOR EX. AWS, WE WILL DIRECTLY SEND THE MULTER OBJECT WITHOUT USE OF fs, USING AWS LIBRARIES FOR NODEJS
        // try {
        //     fs.writeFileSync(`${__dirname}/../uploads/${fileName}`, image);
        // } catch (error) {
        //     console.log(error);
        //     console.log("File error block");
        // }
        // let urlmine = `${__dirname}/uploads/${req.file.filename}`;
        // console.log(req.file.buffer.toString("base64").substring(0,10));
        // console.log(fs.readFileSync(req.file.buffer.toString("base64")));
        // console.log(req.file);
        // res.send(req.file.buffer.toString('base64'));
        // return;

        // create an item with the information
        Item.create({
            name, price, info, seller, userId: user.id, category,
            image: {
                // data: fs.readFileSync(`${__dirname}\\uploads\\${req.file.filename}`),
                data: req.file.buffer.toString("base64"),
                contentType: req.file.mimetype
            }
        }, (err, item) => {
            if (err) {
                res.json({ err });
            }
            else {
                res.send("Item added successfully!");
            }
        })
    } catch (error) {
        console.log(error);
        res.json({ error, message: "Server Error Occured! Try Again Later!" });
    }

});

// ROUTE 2: Delete an Item with Delete Method
router.delete('/delete/:id', fetchuser, async (req, res) => {
    try {
        // checking if user is valid and registered on database
        let user = await User.findById(req.user.id);
        if (!user) {
            res.status(404).json({ error: "user not found" });
        }
        let itemId = req.params.id;
        let item = await Item.findById(itemId);
        // check if item exists
        if (!item) {
            res.status(404).json({ error: "Item not found" });
        }
        // confirm that the item searched for has same user id as that of logged in user
        if (item.userId !== user.id) {
            res.status(401).json({ error: "User not allowed" });
        }
        // delete the item
        item = await Item.remove({ _id: itemId });
        res.send("Item Successfully Deleted!");
    } catch (error) {
        res.json({ error, message: "Server Error Occured! Try Again Later!" });
    }
});

// ROUTE 3: get User specific items
router.get('/myItems', fetchuser, async (req, res) => {
    try {
        // checking if user exists for the corresponding user id
        let user = await User.findById(req.user.id);
        if (!user) {
            res.json({ error: "User doesn't Exists" });
            return;
        }
        let items = await Item.find({ userId: req.user.id });
        res.json(items);
    } catch (error) {
        res.json({ error, message: "Server Error Occured! Try Again Later!" });
    }
});

// ROUTE 4: edit a product by providing its product id in the url params
router.post('/edit/:id', [upload.single('image'), fetchuser], async (req, res) => {
    try {
        // checking if user exists for the corresponding user id
        let user = await User.findById(req.user.id);
        if (!user) {
            res.json({ error: "User doesn't Exists" });
            return;
        }
        // check if product exists for the corresponding product id
        let productId = req.params.id;
        let product = await Item.findById(productId);
        if (!product) {
            res.json({ error: "Product Doesn't exists" });
            return;
        }

        // check if media file is updated
        if (req.file) {
            // get data from the req.body (we are using multer hence we have req.file and req.body.product)
            let { name, price, info } = JSON.parse(req.body.product);

            // update the item from the db, finding the item with the product it
            Item.updateOne({
                "_id": mongoose.Types.ObjectId(productId)
            }, {
                $set: {
                    "name": name,
                    "price": price,
                    "info": info,
                    "image": {
                        // data: fs.readFileSync(`${__dirname}\\uploads\\${req.file.filename}`),
                        data: req.file.buffer.toString('base64'),
                        contentType: req.file.mimetype
                    }
                }
            }, (err, item) => {
                if (err) {
                    res.json({ err });
                    return;
                }
                else {
                    res.json({ item });
                    return;
                }
            })
        }
        // if media file is not updated
        else {
            // get data from the req.body
            let { name, price, info } = req.body;
            // media file is not updated, assigned to old value
            Item.updateOne({
                "_id": mongoose.Types.ObjectId(productId)
            }, {
                $set: {
                    "name": name,
                    "price": price,
                    "info": info,
                }
            }, async (err, item) => {
                if (err) {
                    res.json({ err });
                }
                else {
                    res.send("Product Updated Successfully!");
                    // product = await Item.findById(productId);
                    // res.json(product);
                }
            })
        }
    } catch (error) {
        res.json({ error, message: "Server Error Occured! Try Again Later!" });
    }
});

module.exports = router;