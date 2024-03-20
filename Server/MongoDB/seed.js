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

    //create new comment
    const comment1 = new Comment({
        username: savedUser._id,
        description: 'Loved this work out!',
        likes: 2
    });

    //create new comment
    const comment2 = new Comment({
        username: savedUser._id,
        description: 'I made this twice, and the second time I added feta... game changer',
        likes: 45
    });

    //create new comment
    const comment3 = new Comment({
        username: savedTrainer._id,
        description: 'Why is this labeled as beginnger friendly? It definitely is not.',
        likes: 98
    });

    //create new comment
    const comment4 = new Comment({
        username: savedTrainer2._id,
        description: 'Boring af.',
        likes: 0
    });

    //create new comment
    const comment5 = new Comment({
        username: saveduser2._id,
        description: 'Do you have a vegetarian version?',
        likes: 22
    });

    const saveComment1 = await comment1.save();
    const saveComment2 = await comment2.save();
    const saveComment3 = await comment3.save();
    const saveComment4 = await comment4.save();
    const saveComment5 = await comment5.save();



    const Weight = require('./schema/weight');
    Weight.insertMany([
        {
            date: new Date('2024-03-18'),  
            measurement: 'lb',
            amount: 175,

        },
        {
            date: new Date('2024-03-15'),  
            measurement: 'kg',
            amount: 78
        }

    ]).then(function () {
        console.log("Data inserted") // Success
    }).catch(function (error) {
        console.log(error)     // Failure
    });
    

    const Sleep = require('./schema/sleep'); 
    
    Sleep.insertMany([
        {
            date: new Date('2024-03-18'),  // Today's date 
            startTime: '11:15 PM',
            duration: 7.5  // Hours
        },
        {
            date: new Date('2024-03-17'),  // Yesterday
            startTime: '10:45 PM',
            duration: 8
        },
        // Add more sample sleep data as needed
    ]).then(function () {
        console.log("Data inserted") // Success
    }).catch(function (error) {
        console.log(error)     // Failure
    });


    // Add post data
    const post1 = new Post({
        trainerUsername: savedTrainer._id,
        title: 'Intense Cardio Workout',
        description: 'A high-intensity cardio workout for advanced users.',
        creationDate: new Date(),
        post_type: 'workout',
        comments: [savedComment1._id],
        likes: 10,
        workout_id: workout3
    });

    const Post2 = new Post({
        trainerUsername: savedTrainer2._id,
        title: 'Beginner Strength Training',
        description: 'A basic strength training routine for beginners.',
        creationDate: new Date(),
        post_type: 'workout',
        comments: [savedComment3._id],
        likes: 15,
        workout_id: workout2
    });

    const Post3 = new Post({
        trainerUsername: savedTrainer._id,
        title: 'Core Strengthening Exercises',
        description: 'Exercises to strengthen your core muscles.',
        creationDate: new Date(),
        post_type: 'workout',
        comments: [savedComment4._id],
        likes: 5,
        workout_id: workout1
    });

    const Post4 = new Post({
        trainerUsername: savedTrainer2._id,
        title: 'Upper Body',
        description: 'Best arm workout!',
        creationDate: new Date(),
        post_type: 'workout',
        comments: [savedComment4._id],
        likes: 20,
        workout_id: workout4
    });

    const Post5 = new Post({
        trainerUsername: savedTrainer2._id,
        title: 'Abs of Steel',
        description: 'Beginner friendly core workout',
        creationDate: new Date(),
        post_type: 'workout',
        comments: [savedComment3._id],
        likes: 20,
        workout_id: workout5
    });




    // Optionally, you can close the connection when done
    await mongoose.connection.close();
    console.log('Connection closed');
}
