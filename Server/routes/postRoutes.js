const express = require('express')
const router = express.Router();
const cors = require('cors')
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const User = require("../MongoDB/schema/user");
const jwt = require('jsonwebtoken')
const path = require('path')
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const Post = require("../MongoDB/schema/post");


require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

function verifyToken(token, callback) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if (err) {
            console.error("Error verifying token:", err);
            callback(false);
        } else if (user) {
            console.log("User verified:", user);
            callback(true);
        } else {
            console.log("Token not valid");
            callback(false);
        }
    });
}

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

function getUserIdFromToken(token) {
    const decoded = jwt.decode(token);
    return decoded.id
}





// Configure AWS SDK
aws.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: "ca-central-1",
    
});

const s3 = new aws.S3();

// Multer-S3 storage with aws
const uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: "netfits3",
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: (req, file, cb) => {
            console.log(file);
            cb(null, file.originalname);
        },
    }),
});

// POST route for creating a new post
router.post("/uploadPost", uploadS3.array("image", 4), async (req, res) => {
    
    try {

        const { token } = req.cookies;
        console.log("TOKEN:", token);

        await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

 
        const isValidUser = await new Promise((resolve, reject) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        const userId = getUserIdFromToken(token);

        const { title, caption, date } = req.body;
        const images = req.files.map((file) => file.location);

        const newPost = new Post({
            trainerUsername: userId,
            title,
            description: caption,
            creationDate: date,
            post_type: "workout", // or recipe
            images,
            comments: [],
            likes: 0,
            workout_id: null, // Workout ID if it's related
        });

        console.log(req.body)
        console.log(req.files)
        console.log(" new post ", newPost);

        const savedPost = await newPost.save();
        return res.json(savedPost);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;