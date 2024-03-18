const mongoose = require('mongoose');



main().catch(err => console.log(err));

async function main() {
    const User = require('./schema/user');
    const Tracking = require('./schema/tracking');
    // Connect to MongoDB
    await mongoose.connect("mongodb://admin:password@localhost:27017/app_db?authSource=admin");
    console.log("Connected to MongoDB");
    const newUser = new User({
        username: 'john_doe',
        email: 'john@example.com',
        password: '$2y$10$DlX2dnKjWIsJyZWbb5PiQ.VbJCqdaKCppF7vdVdc2JZjw6qXHRAzK',
        following_list: [], // Empty following list for now
        user_role: 'user', // Assign user role
        gender: 'male',
        age: 18,
        experienceLevel: 'beginner'
    });

    const admin = new User({
        username: 'leader_admin',
        email: 'admin@example.com',
        password: '$2y$10$nRlH4g7j6SPQkCF6M6DbieTKkdG/oZuC91hlg3Tw8Wxd9KHBdlcdC',
        following_list: [],
        user_role: 'admin',
        gender: 'male',
        age: 25,
        experienceLevel: 'advanced'
    });
    // Save the user to the database
    const savedUser = await newUser.save();
    const savedAdmin = await admin.save();
    const trainer = new User({
        username: 'trainer_ethan',
        email: 'trainer@example.com',
        password: '$2y$10$C6XG9MLRsUPYdAle7GK4zubqEYdxsHrC7jgQo1ckOPMySp560AWXK',
        following_list: [],
        user_role: 'trainer',
        gender: 'male',
        age: 21,
        experienceLevel: 'advanced'
    });
    const savedTrainer = await trainer.save();
    const trainer2 = new User({
        username: 'trainerG',
        email: 'trainerG@example.com',
        password: '$2y$10$X18rqlVb0KGP92DThhEN0ONA3JmrwyKPWjdsYXFaZb26zcPc8m086',
        following_list: [],
        user_role: 'trainer',
        gender: 'female',
        age: 30,
        experienceLevel: 'advanced'
    });
    const savedTrainer2 = await trainer2.save();
    const user2 = new User({
        username: 'cool_guy',
        email: 'guy@example.com',
        password: '$2y$10$PXPjtoc3Q8QcELvll0heyeXVV2o/Eb26VfKckP0j72kSKQYJRxVRq',
        following_list: [savedTrainer,savedTrainer2],
        user_role: 'user',
        gender: 'male',
        age: 19,
        experienceLevel: 'intermediate'
    });
    const saveduser2 = await user2.save();
    const workout1 = new Workout({
        date: new Date(),
        name: ['crunches','pushups','situps'],
        reps: [20,10,15],
        sets: [2,3,3],
        resistance: [0,0,0],
        resMeasure: ['lb'],
        duration: []
    });
    const savedw1 = await workout1.save();
    const workout2 = new Workout({
        date: new Date(),
        name: ['Bench Press','Bicep Curls','Squats'],
        reps: [8,15,6],
        sets: [4,3,3],
        resistance: [125,30,160],
        resMeasure: ['lb'],
        duration: []
    });
    const savedw2 = await workout2.save();
    const workout3 = new Workout({
        date: new Date(),
        name: ['run'],
        reps: [0],
        sets: [0],
        resistance: [0],
        resMeasure: ['lb'],
        duration: [50]
    });
    const savedw3 = await workout3.save();
    const workout4 = new Workout({
        date: new Date(),
        name: ['tricep dips','lat pulldown'],
        reps: [25,10],
        sets: [6,3],
        resistance: [0,140],
        resMeasure: ['lb'],
        duration: []
    });
    const savedw4 = await workout4.save();
    const workout5 = new Workout({
        date: new Date(),
        name: ['crunches','plank','situps','v-sit','hip twists'],
        reps: [20,0,15,10,40],
        sets: [3,3,3,3,3],
        resistance: [0,0,0,0,0],
        resMeasure: ['lb'],
        duration: [0,60,0,0,0]
    });
    const savedw5 = await workout5.save();

    // Optionally, you can close the connection when done
    await mongoose.connection.close();
    console.log('Connection closed');
}