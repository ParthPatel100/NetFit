const mongoose = require('mongoose');
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const express = require('express')
const router = express.Router();
const cors = require('cors')
const User = require("../MongoDB/schema/user");
const ObjectId = require('mongodb').ObjectId;

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

router.get('/getFollowingData', async (req, res) => {
    const username = req.user.name

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const user = await User.findOne({ username: username  });
        if (user) {
            const followingList = user.following_list
            console.log(followingList)
            const data = await Promise.all(followingList.map(async (trainer) => {
                console.log(trainer)
                return await User.findOne({_id: trainer})
            }))
            console.log(data)
            return res.status(200).json(data);
        } else {
            console.log('No user found for the user with ID:',user);
            return res.status(200).json({ error: "No user found for the user" });
        }
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router
