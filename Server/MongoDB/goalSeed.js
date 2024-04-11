const mongoose = require('mongoose');
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })


main().catch(err => console.log(err));

async function main() {
    const Goals = require('./schema/goals');

    // Connect to MongoDB
    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);
    console.log("Connected to MongoDB");

    const goals = new Goals({
        userId: "65fbb5e8684d1930c6047600",
        calories: "2000",
        carbohydrates: "30", // we need references
        fat: "30", // we need references
        protein: "30", // we need references
        sugar: "30",
        calories_burn: "30",
        workouts: "30",
        workout_duration: "30",
        sleep: "30",
        weight: "30",
        water: "30",
    });

    await goals.save();

    // Optionally, you can close the connection when done
    await mongoose.connection.close();
    console.log('Connection closed');
}
