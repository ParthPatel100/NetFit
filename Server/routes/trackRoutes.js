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

        console.log("foods retreived", foods);

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
        console.log("date ", req.body.date);

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

        console.log(req.body)
        console.log(" new food ", newFood);

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
        console.log("date ", req.body.date);
        const foodId = req.body._id;

        

        const updatedFood = await Food.findByIdAndUpdate(
            foodId,
            req.body, // Use the entire req.body object as the update
            { new: true } // This option ensures we get the updated document back
        );

        if (req.body.notes && req.body.notes.trim() !== '') {
            newFood.notes = req.body.notes;
        }

        console.log(req.body)
        console.log(" edit food ", updatedFood);

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
        //const workoutId = req.body._id;
        const foodId = req.query._id;
        console.log(foodId);
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

        console.log("new call");
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
        console.log("date ", req.body.date);

        const newWorkout = new Workout({
            
            userId: userId,
            date: req.body.date,
            name: req.body.name,
            reps: req.body.reps,
            sets: req.body.sets,
            resistance: req.body.resistance,
            resMeasure: req.body.resMeasure,
            duration: req.body.duration
        });

        console.log(req.body)
        console.log(" new workout ", newWorkout);

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
        console.log("date ", req.body.date);
        const workoutId = req.body._id;

        

        const updatedWorkout = await Workout.findByIdAndUpdate(
            workoutId,
            req.body, // Use the entire req.body object as the update
            { new: true } // This option ensures we get the updated document back
        );

        if (req.body.notes && req.body.notes.trim() !== '') {
            newWorkout.notes = req.body.notes;
        }

        console.log(req.body)
        console.log(" new workout ", updatedWorkout);

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
        //const workoutId = req.body._id;
        const workoutId = req.query._id;
        console.log(workoutId);
        const deletedWorkout = await Workout.findByIdAndDelete(workoutId);
        res.json({ message: "Workout deleted successfully" });
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});




module.exports = router;