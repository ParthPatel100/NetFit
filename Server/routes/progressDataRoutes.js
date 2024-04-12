const mongoose = require('mongoose');
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const express = require('express')
const router = express.Router();
const cors = require('cors')
const Weight = require("../MongoDB/schema/weight");
const Water = require("../MongoDB/schema/water");
const Sleep = require("../MongoDB/schema/sleep");
const Food = require("../MongoDB/schema/foods");
const Workout = require("../MongoDB/schema/workout");
const {ObjectId} = require("mongodb");

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)


router.get('/getWeightData', async (req, res) => {
    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    const userId = req.user.id



    const {from, to} = req.query

    try {
        const data = await Weight.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    date: {
                        $gte: new Date(from),
                        $lt: new Date(to)
                    }
                }
            },
            {
                $group: {
                    _id: { date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } },
                    totalAmount: { $sum: '$amount' }
                }
            },
            {
                $sort: { '_id.date': 1 } // Optional: Sort the result by date in ascending order
            }
        ]);


        return res.status(200).json(data)
    } catch (error) {
        console.error('Error finding user goals:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/getWaterData', async (req, res) => {
    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    const userId = req.user.id

    const {from, to} = req.query

    try {
        const data = await Water.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    date: {
                        $gte: new Date(from),
                        $lt: new Date(to)
                    }
                }
            },
            {
                $group: {
                    _id: { date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } },
                    totalAmount: { $sum: '$amount' }
                }
            },
            {
                $sort: { '_id.date': 1 } // Optional: Sort the result by date in ascending order
            }
        ]);
        console.log("Data:", data)

        return res.status(200).json(data)
    } catch (error) {
        console.error('Error finding user goals:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/getSleepData', async (req, res) => {
    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    const userId = req.user.id

    const {from, to} = req.query



    try {
        const data = await Sleep.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    date: {
                        $gte: new Date(from),
                        $lt: new Date(to)
                    }
                }
            },
            {
                $group: {
                    _id: { date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } },
                    totalAmount: { $sum: '$duration' }
                }
            },
            {
                $sort: { '_id.date': 1 } // Optional: Sort the result by date in ascending order
            }
        ]);

        console.log("DAta sleep: ", data)

        return res.status(200).json(data)
    } catch (error) {
        console.error('Error finding user goals:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get('/getCalConsumedData', async (req, res) => {
    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    const userId = req.user.id

    const {from, to} = req.query

    try {
        const data = await Food.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    date: {
                        $gte: new Date(from),
                        $lt: new Date(to)
                    }
                }
            },
            {
                $group: {
                    _id: { date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } },
                    totalAmount: { $sum: '$calories' }
                }
            },
            {
                $sort: { '_id.date': 1 } // Optional: Sort the result by date in ascending order
            }
        ]);

        return res.status(200).json(data)
    } catch (error) {
        console.error('Error finding user goals:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/getWorkoutData', async (req, res) => {
    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    const userId = req.user.id


    const {from, to} = req.query

    try {
        const data = await Workout.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    date: {
                        $gte: new Date(from),
                        $lt: new Date(to)
                    }
                }
            },
            {
                $group: {
                    _id: { date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } },
                    calories: { $sum: '$calories' },
                    duration: { $sum: '$duration' }
                }
            },
            {
                $sort: { '_id.date': 1 } // Optional: Sort the result by date in ascending order
            }
        ]);


        return res.status(200).json(data)
    } catch (error) {
        console.error('Error finding user goals:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/getTodayProgressData', async (req, res) => {
    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    const userId = req.user.id

    const today = new Date();

    today.setHours(-6,0,0,0)
    today.set
    console.log(today)

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    try {
        const workoutData = await Workout.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    date: {
                        $gte: today,
                        $lt: tomorrow
                    }
                }
            },
            {
                $group: {
                    _id: { date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } },
                    totalDuration: { $sum: '$duration' },
                    totalCalBurnt: { $sum: '$calories' }
                }
            },
            {
                $sort: { '_id.date': 1 } // Optional: Sort the result by date in ascending order
            }
        ]);

        console.log("Workoutdata: Here: ", workoutData)

        const foodData = await Food.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    date: {
                        $gte: today,
                        $lt: tomorrow
                    }
                }
            },
            {
                $group: {
                    _id: { date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } },
                    totalCalConsumed: { $sum: '$duration' },
                    totalCalGained: { $sum: '$calories' },
                    totalProteinGained: { $sum: '$protein' },
                    totalFatsGained: { $sum: '$fat' },
                    totalCarbsGained: { $sum: '$carb' },
                    totalSugarGained: { $sum: '$sugar' }

                }
            },
            {
                $sort: { '_id.date': 1 } // Optional: Sort the result by date in ascending order
            }
        ]);

        const waterData = await Water.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    date: {
                        $gte: today,
                        $lt: tomorrow
                    }
                }
            },
            {
                $group: {
                    _id: { date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } },
                    totalAmount: { $sum: '$amount' }
                }
            },
            {
                $sort: { '_id.date': 1 } // Optional: Sort the result by date in ascending order
            }
        ]);

        const sleepData = await Sleep.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    date: {
                        $gte: today,
                        $lt: tomorrow
                    }
                }
            },
            {
                $group: {
                    _id: { date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } },
                    totalDuration: { $sum: '$duration' }
                }
            },
            {
                $sort: { '_id.date': 1 } // Optional: Sort the result by date in ascending order
            }
        ]);

        return res.status(200).json({workoutData, foodData, sleepData, waterData})
    } catch (error) {
        console.error('Error finding user goals:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router



