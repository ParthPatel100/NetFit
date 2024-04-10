const mongoose = require('mongoose');
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const express = require('express')
const router = express.Router();
const cors = require('cors')
const Weight = require("../MongoDB/schema/weight");

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

router.get('/getWeightData', async (req, res) => {
    const userId = req.user.id
    console.log("User:",userId)


    const {from, to} = req.query

    console.log(from)

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    console.log("Connected")
    try {
        const data = await Weight.find({
            user_id: userId,
            date: {
                $gte: new Date(from),
                $lt: new Date(to)
            }
        })
        console.log("Data:", data)

        await mongoose.connection.close();

        return res.status(200).json(data)
    } catch (error) {
        console.error('Error finding user goals:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router



