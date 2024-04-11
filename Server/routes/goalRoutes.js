const express = require('express')
const router = express.Router();
const cors = require('cors')
const mongoose = require("mongoose");
const Goals = require("../MongoDB/schema/goals")

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

router.post('/updateCurrentGoals', async (req, res) => {

    const userId = req.user.id

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {

        const {calories,
            carbohydrates,
            fat,
            protein,
            sugar,
            calories_burn,
            workouts,
            workout_duration,
            sleep,
            weight,
            water} = req.body

        const updatedGoals = {
            calories,
            carbohydrates,
            fat,
            protein,
            sugar,
            calories_burn,
            workouts,
            workout_duration,
            sleep,
            weight,
            water
        };

        const options = { new: true, upsert: true }; // Option to return the updated document and create if it doesn't exist
        const updatedGoal = await Goals.findOneAndUpdate({ userId: userId }, updatedGoals, options);
        return res.status(200).json(updatedGoal);

    } catch (error) {
        console.error('Error finding user goals:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get('/getCurrentGoals', async (req, res) => {
    console.log(req.user)

    const userId = req.user.id

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);


    try {
        const goal = await Goals.findOne({ userId: userId });

        if (goal) {
            return res.status(200).json(goal);
        } else {
            console.log('No goals found for the user with ID:', userId);
            return res.status(200).json({ error: "No goals found for the user" });
        }

    } catch (error) {
        console.error('Error finding user goals:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router
