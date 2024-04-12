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
const Workout = require("../MongoDB/schema/workout");
const Food = require("../MongoDB/schema/foods");


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







module.exports = router;