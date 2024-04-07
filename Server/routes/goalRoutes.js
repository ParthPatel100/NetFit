const express = require('express')
const router = express.Router();
const cors = require('cors')
const mongoose = require("mongoose");
const Goals = require("../MongoDB/schema/goals")
const jwt = require("jsonwebtoken");



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

router.get('/getCurrentGoals', async (req, res) => {
    const { token } = req.cookies;
    console.log("TOKEN:", token);

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const isValidUser = await new Promise((resolve, reject) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        const userId = getUserIdFromToken(token);
        console.log("Decoded userId:", userId);

        const goal = await Goals.findOne({ user_id: userId });
        if (goal) {
            return res.status(200).json(goal);
        } else {
            console.log('No goals found for the user with ID:', userId);
            return res.status(404).json({ error: "No goals found for the user" });
        }
    } catch (error) {
        console.error('Error finding user goals:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router
