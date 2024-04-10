const express = require('express');
const router = express.Router();
const cors = require('cors');
const mongoose = require("mongoose");
const Tracking = require("../MongoDB/schema/tracking");
const Workout = require("../MongoDB/schema/workout"); // Import the Workout model
const Sleep = require("../MongoDB/schema/sleep")
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

        // Check if tracking for the day exists, if not create one, else add the sleep entry to it
        const trackingForDay = await Tracking.findOne({ username, date });
        if (trackingForDay) {
            trackingForDay.sleep_id.push(sleep._id);
            await trackingForDay.save();
        } else {
            // If no tracking exists for the day, create a new one with this sleep entry
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

        // Find the sleep entry for the user on the given date
        const trackingForDay = await Tracking.findOne({ username, date }).populate('sleep_id');

        if (!trackingForDay) {
            return res.status(404).json({ error: "No sleep entry found for the given date" });
        }

        let sleepEntryUpdated = false;

        // Assuming there could be multiple sleep entries for the day, we'll update all. Adjust logic if needed.
        for (let sleepId of trackingForDay.sleep_id) {
            const updateData = {};
            if (startTime) updateData.startTime = startTime;
            if (duration) updateData.duration = duration;

            const updatedSleep = await Sleep.findByIdAndUpdate(sleepId, updateData, { new: true });
            if (updatedSleep) {
                sleepEntryUpdated = true;
            }
        }

        if (!sleepEntryUpdated) {
            return res.status(404).json({ error: "Sleep entry not found or unchanged" });
        }

        return res.status(200).json({ message: "Sleep entry updated successfully" });

    } catch (error) {
        console.error('Error updating sleep entry:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


router.delete('/sleepDelete', async (req, res) => {
    const { token } = req.cookies;
    const { date } = req.body; // Assuming date is used to find the sleep entry to be deleted

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

        // Find the tracking entry for the user on the given date
        const trackingForDay = await Tracking.findOne({ username, date }).populate('sleep_id');
        
        if (!trackingForDay || !trackingForDay.sleep_id.length) {
            return res.status(404).json({ error: "No sleep entry found for the given date" });
        }

        // Delete the sleep entries for the day and remove them from the tracking document
        const sleepEntryDeletions = trackingForDay.sleep_id.map(sleepId => Sleep.findByIdAndDelete(sleepId));
        await Promise.all(sleepEntryDeletions);

        // Remove the reference to the deleted sleep entries in the tracking document
        trackingForDay.sleep_id = [];
        await trackingForDay.save();

        return res.status(200).json({ message: "Sleep entry deleted successfully" });

    } catch (error) {
        console.error('Error deleting sleep entry:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get('/sleepGet', async (req, res) => {
    const { token } = req.cookies;
    const { startDate, endDate } = req.query; // Use query params to allow flexibility

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

        // Define the query based on whether a start and end date are provided
        let query = { username };
        if (startDate && endDate) {
            query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        } else if (startDate) {
            query.date = new Date(startDate);
        }

        // Fetch the tracking entries and populate the sleep_id field to get sleep details
        const trackingEntries = await Tracking.find(query).populate('sleep_id');

        // Extract sleep entries from the tracking documents
        const sleepEntries = trackingEntries.map(entry => entry.sleep_id).flat();

        return res.status(200).json(sleepEntries);

    } catch (error) {
        console.error('Error fetching sleep entries:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
