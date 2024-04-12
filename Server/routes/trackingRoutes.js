const express = require('express');
const router = express.Router();
const cors = require('cors');
const mongoose = require("mongoose");
const Tracking = require("../MongoDB/schema/tracking");
const Sleep = require("../MongoDB/schema/sleep")
const Water = require("../MongoDB/schema/water")
const Weight = require("../MongoDB/schema/weight")
const Workout = require("../MongoDB/schema/workout");
const Post = require("../MongoDB/schema/post");
const SavedWorkouts = require("../MongoDB/schema/saved_workouts");


const bcrypt = require('bcryptjs')
const User = require("../MongoDB/schema/user");
const path = require('path')

const jwt = require("jsonwebtoken");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const upload = multer({dest: 'uploads/'});

const Food = require("../MongoDB/schema/foods");

// Reuse the same verifyToken function
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

router.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

function getUserIdFromToken(token) {
    const decoded = jwt.decode(token);
    return decoded.id;
}

// Example route for adding or updating tracking data
router.post('/updateTrackingData', async (req, res) => {
    const { token } = req.cookies;

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const isValidUser = await new Promise((resolve) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        const { date, food_id, water_id, sleep_id, weight_id, workout_id, recipe_id } = req.body;

        const trackingData = {
            username: getUserIdFromToken(token),
            date,
            food_id,
            water_id,
            sleep_id,
            weight_id,
            workout_id,
            recipe_id
        };

        const options = { new: true, upsert: true };
        const updatedTracking = await Tracking.findOneAndUpdate({ username: trackingData.username, date: trackingData.date }, trackingData, options);
        return res.status(200).json(updatedTracking);

    } catch (error) {
        console.error('Error updating tracking data:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/getTrackingData', async (req, res) => {
    const { token, date } = req.cookies;

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const isValidUser = await new Promise((resolve) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        const username = getUserIdFromToken(token);

        const trackingData = await Tracking.findOne({ username, date });
        if (trackingData) {
            return res.status(200).json(trackingData);
        } else {
            return res.status(404).json({ error: "No tracking data found for the specified date" });
        }
    } catch (error) {
        console.error('Error retrieving tracking data:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});



router.post('/sleepCreate', async (req, res) => {
    const { token } = req.cookies;
    const { date, startTime, duration } = req.body;

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const isValidUser = await new Promise((resolve) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        const username = getUserIdFromToken(token);
        console.log("here")
        // Create the sleep entry
        const sleep = new Sleep({ userId: username, date, startTime, duration });
        await sleep.save();
            console.log(sleep)
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            // Set the end of the day
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
        console.log(startOfDay)
 

        return res.status(200).json(sleep);

    } catch (error) {
        console.error('Error creating or updating sleep entry:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


router.put('/sleepEdit', async (req, res) => {
    const { token } = req.cookies;
    const { sleepId, duration } = req.body;

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const isValidUser = await new Promise((resolve) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        const username = getUserIdFromToken(token);
        // Directly update the sleep entry by its ID
        const updatedSleep = await Sleep.findByIdAndUpdate(sleepId, {
            duration: duration
        }, { new: true });

        if (!updatedSleep) {
            return res.status(404).json({ error: "Sleep entry not found or unchanged" });
        }

        return res.status(200).json({ message: "Sleep entry updated successfully", sleep: updatedSleep });

    } catch (error) {
        console.error('Error updating sleep entry:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


router.delete('/sleepDelete', async (req, res) => {
    const { token } = req.cookies;
    const { sleepEntryId } = req.body; // date is used to find the sleep entry to be deleted

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const isValidUser = await new Promise((resolve) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        // First, delete the sleep entry directly by its ID
        const deletedSleepEntry = await Sleep.findByIdAndDelete(sleepEntryId);

        if (!deletedSleepEntry) {
            return res.status(404).json({ error: "Sleep entry not found" });
        }

        // Then, find the tracking document that references this sleep entry ID and remove the ID from it
        const username = getUserIdFromToken(token);
        const trackingDocument = await Tracking.findOne({ username, sleep_id: { $in: [sleepEntryId] } });

        if (trackingDocument) {
            // Remove the sleep entry ID from the tracking document
            trackingDocument.sleep_id = trackingDocument.sleep_id.filter(id => id.toString() !== sleepEntryId);
            await trackingDocument.save();
        }

        return res.status(200).json({ message: "Sleep entry deleted successfully and tracking updated" });

    } catch (error) {
        console.error('Error deleting sleep entry:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

});


router.get('/sleepGet', async (req, res) => {
    const { token } = req.cookies;
    const { date } = req.query; 

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const isValidUser = await new Promise((resolve) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        const userId = getUserIdFromToken(token); // Ensure this method returns a user ID suitable for the schema

        let query = { userId };
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            query.date = { $gte: startOfDay, $lt: endOfDay };
        }

        // Direct query to Sleep model
        const sleepEntries = await Sleep.find(query);

        return res.status(200).json(sleepEntries);

    } catch (error) {
        console.error('Error fetching sleep entries:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post('/waterCreate', async (req, res) => {
    const { token } = req.cookies;
    const { date, measurement, amount } = req.body;

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const isValidUser = await new Promise((resolve) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        const username = getUserIdFromToken(token);

        // Create the water entry
        const water = new Water({ userId: username, date, measurement, amount });
        await water.save();

      

        return res.status(200).json(water);

    } catch (error) {
        console.error('Error creating or updating water entry:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});



router.put('/waterEdit', async (req, res) => {
    const { token } = req.cookies;
    const { waterId, measurement, amount } = req.body;

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const isValidUser = await new Promise((resolve) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        const updatedWater = await Water.findByIdAndUpdate(waterId, {
            measurement,
            amount
        }, { new: true });

        if (!updatedWater) {
            return res.status(404).json({ error: "Water entry not found or unchanged" });
        }

        return res.status(200).json({ message: "Water entry updated successfully", water: updatedWater });

    } catch (error) {
        console.error('Error updating water entry:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});



router.delete('/waterDelete', async (req, res) => {
    const { token } = req.cookies;
    const { waterEntryId } = req.body;

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const isValidUser = await new Promise((resolve) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        // Delete the water entry by its ID
        const deletedWaterEntry = await Water.findByIdAndDelete(waterEntryId);

        if (!deletedWaterEntry) {
            return res.status(404).json({ error: "Water entry not found" });
        }

        // Find the tracking document that references this water entry ID and remove the ID from it
        const username = getUserIdFromToken(token);
        const trackingDocument = await Tracking.findOne({ username, water_id: { $in: [waterEntryId] } });

        if (trackingDocument) {
            // Remove the water entry ID from the tracking document
            trackingDocument.water_id = trackingDocument.water_id.filter(id => id.toString() !== waterEntryId);
            await trackingDocument.save();
        }

        return res.status(200).json({ message: "Water entry deleted successfully and tracking updated" });

    } catch (error) {
        console.error('Error deleting water entry:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get('/waterGet', async (req, res) => {
    const { token } = req.cookies;
    const { date } = req.query;

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const isValidUser = await new Promise((resolve) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

<<<<<<< HEAD
        const username = getUserIdFromToken(token);
        const userId = getUserIdFromToken(token);

        //const { date, name, reps, sets, resistance, resMeasure, duration } = req.body;
        //console.log("new call");
        //const date = req.query.date;
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
=======
        const userId = getUserIdFromToken(token); 

        let query = { userId };
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
>>>>>>> main

        // Set the end of the day
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

<<<<<<< HEAD
        const water = await Water.find({
            userId: userId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        //console.log("foods retreived", foods);
=======
            query.date = { $gte: startOfDay, $lt: endOfDay };
        }

        const waterEntries = await Water.find(query);
>>>>>>> main

        return res.json(water);

    } catch (error) {
        console.error('Error fetching water entries:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});




router.post('/weightCreate', async (req, res) => {
    const { token } = req.cookies;
    const { date, measurement, amount } = req.body;

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const isValidUser = await new Promise((resolve) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        const username = getUserIdFromToken(token);

        // Create the weight entry
        const weight = new Weight({ userId: username, date, measurement, amount });
        await weight.save();


        return res.status(200).json(weight);

    } catch (error) {
        console.error('Error creating or updating weight entry:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});



router.put('/weightEdit', async (req, res) => {
    const { token } = req.cookies;
    const { weightId, measurement, amount } = req.body;

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const isValidUser = await new Promise((resolve) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        const updatedWeight = await Weight.findByIdAndUpdate(weightId, {
            measurement,
            amount
        }, { new: true });

        if (!updatedWeight) {
            return res.status(404).json({ error: "Weight entry not found or unchanged" });
        }

        return res.status(200).json({ message: "Weight entry updated successfully", weight: updatedWeight });

    } catch (error) {
        console.error('Error updating weight entry:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});



router.delete('/weightDelete', async (req, res) => {
    const { token } = req.cookies;
    const { weightEntryId } = req.body;

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const isValidUser = await new Promise((resolve) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        // Delete the weight entry by its ID
        const deletedWeightEntry = await Weight.findByIdAndDelete(weightEntryId);

        if (!deletedWeightEntry) {
            return res.status(404).json({ error: "Weight entry not found" });
        }

        // Find the tracking document that references this weight entry ID and remove the ID from it
        const username = getUserIdFromToken(token);
        const trackingDocument = await Tracking.findOne({ username, weight_id: { $in: [weightEntryId] } });

        if (trackingDocument) {
            // Remove the weight entry ID from the tracking document
            trackingDocument.weight_id = trackingDocument.weight_id.filter(id => id.toString() !== weightEntryId);
            await trackingDocument.save();
        }

        return res.status(200).json({ message: "Weight entry deleted successfully and tracking updated" });

    } catch (error) {
        console.error('Error deleting weight entry:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get('/weightGet', async (req, res) => {
    const { token } = req.cookies;
    const { date } = req.query;

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const isValidUser = await new Promise((resolve) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        const userId = getUserIdFromToken(token); // Ensure this method accurately gets the user's ID

        let query = { userId };
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            query.date = { $gte: startOfDay, $lt: endOfDay };
        }

        // Direct query to Weight model
        const weightEntries = await Weight.find(query);

        return res.status(200).json(weightEntries);

    } catch (error) {
        console.error('Error fetching weight entries:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});



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


router.get("/getAllFoods", async (req, res) => {

    try {

        const { token } = req.cookies;
        //console.log("TOKEN:", token);

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

        //const { date, name, reps, sets, resistance, resMeasure, duration } = req.body;
        //console.log("new call");
        const date = req.query.date;
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        // Set the end of the day
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const foods = await Food.find({
            userId: userId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        //console.log("foods retreived", foods);

        return res.json(foods);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


// POST route for creating a new post
router.post("/postFood", async (req, res) => {

    try {

        const { token } = req.cookies;
        //console.log("TOKEN:", token);

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

        //const { date, name, reps, sets, resistance, resMeasure, duration } = req.body;
        //console.log("date ", req.body.date);

        const newFood = new Food({
            userId: userId,
            name: req.body.name,
            date: req.body.date,
            meal_type: req.body.meal_type,
            amount: req.body.amount,
            measurement: req.body.measurement,
            protein: req.body.protein,
            carb: req.body.carb,
            calories: req.body.calories,
            fat: req.body.fat,
            sleep: req.body.sleep,
            sodium: req.body.sodium,
            sugar: req.body.sugar,
            fibre: req.body.fibre,
            satFat: req.body.satFat,
            transFat: req.body.transFat,
            cholesterol: req.body.cholesterol,
            potassium: req.body.potassium,
            iron: req.body.iron,
            vitA: req.body.vitA,
            vitC: req.body.vitC,
            calcium: req.body.calcium,
            vitD: req.body.vitD,
            vitK: req.body.vitK,
            vitB6: req.body.vitB6,
            vitB12: req.body.vitB12
        });

        //console.log(req.body)
        //console.log(" new food ", newFood);

        const savedFood = await newFood.save();
        return res.json(savedFood);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


// POST route for creating a new post
router.put("/editFood", async (req, res) => {

    try {

        const { token } = req.cookies;
        //console.log("TOKEN:", token);

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

        //const { date, name, reps, sets, resistance, resMeasure, duration } = req.body;
        //console.log("date ", req.body.date);
        const foodId = req.body._id;



        const updatedFood = await Food.findByIdAndUpdate(
            foodId,
            req.body, // Use the entire req.body object as the update
            { new: true } // This option ensures we get the updated document back
        );

        if (req.body.notes && req.body.notes.trim() !== '') {
            newFood.notes = req.body.notes;
        }

        //console.log(req.body)
        //console.log(" edit food ", updatedFood);

        const savedFood = await updatedFood.save();
        return res.json(savedFood);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// delete food
router.delete("/deleteFood", async (req, res) => {

    try {

        const { token } = req.cookies;
        //console.log("TOKEN:", token);

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
        //const workoutId = req.body._id;
        const foodId = req.query._id;
        //console.log(foodId);
        const deletedWorkout = await Food.findByIdAndDelete(foodId);
        res.json({ message: "Food deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


//ALL GETS TO POPULATE
router.get("/getAllWorkouts", async (req, res) => {

    try {

        const { token } = req.cookies;
        //console.log("TOKEN:", token);

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

        //console.log("new call");
        const date = req.query.date;
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        // Set the end of the day
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const workouts = await Workout.find({
            userId: userId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        //console.log(workouts);

        return res.json(workouts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


// POST route for creating a new post
router.post("/postWorkout", async (req, res) => {

    try {

        const { token } = req.cookies;
        //console.log("TOKEN:", token);

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

        //const { date, name, reps, sets, resistance, resMeasure, duration } = req.body;
        //console.log("date ", req.body.date);

        const newWorkout = new Workout({

            userId: userId,
            date: req.body.date,
            name: req.body.name,
            reps: req.body.reps,
            sets: req.body.sets,
            resistance: req.body.resistance,
            resMeasure: req.body.resMeasure,
            duration: req.body.duration,
            calories: req.body.calories
        });

        //console.log(req.body)
        //console.log(" new workout ", newWorkout);

        const savedWorkout = await newWorkout.save();
        return res.json(savedWorkout);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


// POST route for creating a new post
router.put("/editWorkout", async (req, res) => {

    try {

        const { token } = req.cookies;
        //console.log("TOKEN:", token);

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

        //const { date, name, reps, sets, resistance, resMeasure, duration } = req.body;
        //console.log("date ", req.body.date);
        const workoutId = req.body._id;



        const updatedWorkout = await Workout.findByIdAndUpdate(
            workoutId,
            req.body, // Use the entire req.body object as the update
            { new: true } // This option ensures we get the updated document back
        );

        if (req.body.notes && req.body.notes.trim() !== '') {
            newWorkout.notes = req.body.notes;
        }

        //console.log(req.body)
        //console.log(" new workout ", updatedWorkout);

        const savedWorkout = await updatedWorkout.save();
        return res.json(savedWorkout);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// delete workout
router.delete("/deleteWorkout", async (req, res) => {

    try {

        const { token } = req.cookies;
        //console.log("TOKEN:", token);

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
        //const workoutId = req.body._id;
        const workoutId = req.query._id;
        //console.log(workoutId);
        const deletedWorkout = await Workout.findByIdAndDelete(workoutId);
        res.json({ message: "Workout deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.get("/getSavedPosts", async (req, res) => {

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

        //const { date, name, reps, sets, resistance, resMeasure, duration } = req.body;
        console.log("new call");
        console.log(userId);

        const savedWorkouts = await SavedWorkouts.find({
            user: userId,
        });

        console.log("savedWorkouts retreived", savedWorkouts);

        return res.json(savedWorkouts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


router.get("/getPost", async (req, res) => {

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

        const postId = req.query._id; // Assuming postId is the query parameter
        console.log("query ", postId);

        // Fetch the post by ID
        const post = await Post.findById(postId);
        return res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.get("/getWorkout", async (req, res) => {

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

        const workoutId = req.query._id; // Assuming postId is the query parameter
        console.log("query ", workoutId);

        // Fetch the post by ID
        const workout = await Workout.findById(workoutId);
        console.log(workout);
        return res.json(workout);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});





module.exports = router;
