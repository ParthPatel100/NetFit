const express = require('express')
const router = express.Router();
const cors = require('cors')
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const User = require("../MongoDB/schema/user");


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
router.post("/pic", uploadS3.single("image"), async (req, res) => {
    try {
        const { token } = req.cookies;
        const userId = getUserIdFromToken(token);
        var query = {'_id': userId};
        console.log(req.file)
        await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);
        const update = {'profilepic': req.file.location}
        try{
            await User.findOneAndUpdate(query,update)
            res.status(200).send("User updated")
        } catch (error) 
        {
            console.error(error);
            res.status(500).send("Server Error");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.post("/getProfile", async (req, res) => {
try {
    const { token } = req.cookies;

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    const userId = getUserIdFromToken(token);
    try{
        data = await User.findById(userId)
        console.log(data)
    } catch (error) 
    {
            console.error(error);
    }
    return res.json(data);
} catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
}
});
router.post("/delete", async (req, res) => {
    try {
        const { token } = req.cookies;
    
        await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);
    
        const userId = getUserIdFromToken(token);
        const update = {'_id': userId}
        try{
            data= await User.deleteOne(update);
            console.log(data)
        } catch (error) 
        {
                console.error(error);
        }
        return res.json("Deleted");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
    });
router.post("/updateP", async (req, res) => {
    const { token } = req.cookies;
    const password = req.body.id
    console.log(password)
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const userId = getUserIdFromToken(token);
    var query = {'_id': userId};
    var update = {'password': hash};
    try{
    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);
    
    await User.findOneAndUpdate(query,update)

    res.status(200).send("Password updated")
} catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
}
});
router.post("/update", async (req, res) => {
    const { token } = req.cookies;
    console.log(req.body)
    const email= req.body.email;
    const gender = req.body.gender;
    const username = req.body.username;
    const age = req.body.age;
    const experienceLevel = req.body.experience;
    const userId = getUserIdFromToken(token);
    var query = {'_id': userId};
    var update = {'email': email,'username': username,'gender': gender, 'age': age,'experienceLevel': experienceLevel};
    console.log(query);
    console.log(update);
    try{
    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);
    
   await User.findOneAndUpdate(query,update)

    res.status(200).send("User updated")
} catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
}
});
module.exports = router;
