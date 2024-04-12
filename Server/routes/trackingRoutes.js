const express = require('express');
const router = express.Router();
const cors = require('cors');
const mongoose = require("mongoose");
const Tracking = require("../MongoDB/schema/tracking");
const Workout = require("../MongoDB/schema/workout"); // Import the Workout model
const Sleep = require("../MongoDB/schema/sleep")
const Water = require("../MongoDB/schema/water")
const Weight = require("../MongoDB/schema/weight")


const jwt = require("jsonwebtoken");

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


router.post('/workout', async (req, res) => {
    const { token } = req.cookies;
    const { date, name, reps, sets, resistance, resMeasure, duration, calories } = req.body;

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

        // Create or update the workout
        const workout = new Workout({ date, name, reps, sets, resistance, resMeasure, duration, calories });
        await workout.save();

        // Check if tracking for the day exists, if not create one, else add the workout to it
        const trackingForDay = await Tracking.findOne({ username, date });
        if (trackingForDay) {
            trackingForDay.workout_id.push(workout._id);
            await trackingForDay.save();
        } else {
            // If no tracking exists for the day, create a new one with this workout
            const newTracking = new Tracking({
                username,
                date,
                workout_id: [workout._id] // Initialize with the new workout
            });
            await newTracking.save();
        }

        return res.status(200).json(workout);

    } catch (error) {
        console.error('Error creating or updating workout:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put('/workout/:id', async (req, res) => {
    const { token } = req.cookies;
    const workoutId = req.params.id;
    const workoutUpdates = req.body;

    try {
        const isValidUser = await new Promise((resolve) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, workoutUpdates, { new: true });
        res.status(200).json(updatedWorkout);
    } catch (error) {
        console.error('Error updating workout:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete a workout
router.delete('/workout/:id', async (req, res) => {
    const { token } = req.cookies;
    const workoutId = req.params.id;

    try {
        const isValidUser = await new Promise((resolve) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        await Workout.findByIdAndDelete(workoutId);
        res.status(200).json({ message: "Workout deleted successfully" });
    } catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/workoutsByDate', async (req, res) => {
    const { date } = req.query; 
    const { token } = req.cookies; 

    try {
        const isValidUser = await new Promise((resolve) => {
            verifyToken(token, isValid => {
                resolve(isValid);
            });
        });

        if (!isValidUser) {
            return res.status(401).json({ error: "User not valid" });
        }

        const workouts = await Workout.find({ date: new Date(date) }); 
        res.json(workouts);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ error: "Internal Server Error" });
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

        // Create the sleep entry
        const sleep = new Sleep({ date, startTime, duration });
        await sleep.save();

        const trackingForDay = await Tracking.findOne({ username, date });
        if (trackingForDay) {
            trackingForDay.sleep_id.push(sleep._id);
            await trackingForDay.save();
        } else {
            const newTracking = new Tracking({
                username,
                date,
                sleep_id: [sleep._id] // Initialize with the new sleep entry
            });
            await newTracking.save();
        }

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
    //const { startDate, endDate } = req.query; 
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

        const username = getUserIdFromToken(token);

        let query = { username };
       if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            query.date = { $gte: startOfDay, $lt: endOfDay };
        }

        const trackingEntries = await Tracking.find(query).populate('sleep_id');

        const sleepEntries = trackingEntries.map(entry => entry.sleep_id).flat();

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
        const water = new Water({ date, measurement, amount });
        await water.save();

        const trackingForDay = await Tracking.findOne({ username, date });
        if (trackingForDay) {
            trackingForDay.water_id = trackingForDay.water_id || [];
            trackingForDay.water_id.push(water._id);
            await trackingForDay.save();
        } else {
            const newTracking = new Tracking({
                username,
                date,
                water_id: [water._id] // Initialize with the new water entry
            });
            await newTracking.save();
        }

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

        const username = getUserIdFromToken(token);

        let query = { username };
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            query.date = { $gte: startOfDay, $lt: endOfDay };
        }
        const trackingEntries = await Tracking.find(query).populate('water_id');

        const waterEntries = trackingEntries.map(entry => entry.water_id).flat();

        return res.status(200).json(waterEntries);

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
        const weight = new Weight({ date, measurement, amount });
        await weight.save();

        const trackingForDay = await Tracking.findOne({ username, date });
        if (trackingForDay) {
            trackingForDay.weight_id = trackingForDay.weight_id || [];
            trackingForDay.weight_id.push(weight._id);
            await trackingForDay.save();
        } else {
            const newTracking = new Tracking({
                username,
                date,
                weight_id: [weight._id] // Initialize with the new weight entry
            });
            await newTracking.save();
        }

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

        const username = getUserIdFromToken(token);

        let query = { username };
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            query.date = { $gte: startOfDay, $lt: endOfDay };
        }
        const trackingEntries = await Tracking.find(query).populate('weight_id');

        const weightEntries = trackingEntries.map(entry => entry.weight_id).flat();

        return res.status(200).json(weightEntries);

    } catch (error) {
        console.error('Error fetching weight entries:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router;
