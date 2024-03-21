const mongoose = require('mongoose');
const Sleep = require("./schema/sleep");
const Tracking = require("./schema/tracking");



main().catch(err => console.log(err));

async function main() {
    const User = require('./schema/user');
    const Tracking = require('./schema/tracking');
    const Workout = require('./schema/workout');
    const Comment = require('./schema/comment');
    const Post = require('./schema/post');
    const Recipe = require('./schema/recipe');
    const Weight = require('./schema/weight');
    const Sleep = require('./schema/sleep');
    const Food = require('./schema/foods');
    const Water = require('./schema/water')
    const SavedWorkout = require('./schema/saved_workouts')





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



    const weight1 = new Weight({
        date: new Date('2024-03-18'),
        measurement: 'lb',
        amount: 175,
    })
    const weight2 = new Weight({
        date: new Date('2024-03-15'),
        measurement: 'kg',
        amount: 78
    })

    const savedWeight1 = weight1.save();
    const savedWeight2 = weight2.save();

    const sleep1 = new Sleep({
        date: new Date('2024-03-18'),  // Today's date
        startTime: '11:15 PM',
        duration: 7.5  // Hours
    })

    const sleep2 = new Sleep({
        date: new Date('2024-03-17'),  // Yesterday
        startTime: '10:45 PM',
        duration: 8
    })

    const savedSleep1 = sleep1.save();
    const savedSleep2 = sleep2.save();

    const food1 = new Food({
        name: 'Broccoli',
        date: new Date('2024-03-18'),
        calories: 50,
        meal_type: 'lunch',
        measurement: 'g',
        amount: 100,
        protein: 3,
        carb: 6,
        fat: 0
    });

    const food2 = new Food({
        name: 'Salmon',
        date: new Date('2024-03-17'),
        calories: 200,
        meal_type: 'dinner',
        measurement: 'g',
        amount: 150,
        protein: 20,
        carb: 0,
        fat: 12
    });

    const food3 = new Food({
        name: 'Apple',
        date: new Date('2024-03-19'),
        calories: 80,
        meal_type: 'snack',
        measurement: 'each',
        amount: 1,
        protein: 0,
        carb: 22,
        fat: 0
    });

    const food4 = new Food({
        name: 'Pasta',
        date: new Date('2024-03-20'),
        calories: 250,
        meal_type: 'dinner',
        measurement: 'cup',
        amount: 1,
        protein: 7,
        carb: 42,
        fat: 2
    });

    const food5 = new Food({
        name: 'Chicken Salad',
        date: new Date('2024-03-16'),
        calories: 180,
        meal_type: 'lunch',
        measurement: 'g',
        amount: 200,
        protein: 20,
        carb: 8,
        fat: 9
    });

    const savedFood1 = food1.save();
    const savedFood2 = food2.save();
    const savedFood3 = food3.save();
    const savedFood4 = food4.save();
    const savedFood5 = food5.save();

    const water1 = new Water({
        date: new Date('2024-03-18'),
        measurement: 'L',
        amount: 1
    });

    const water2 = new Water({
        date: new Date('2024-03-17'),
        measurement: 'ml',
        amount: 500
    });

    const water3 = new Water({
        date: new Date('2024-03-19'),
        measurement: 'cup',
        amount: 2
    });

    const water4 = new Water({
        date: new Date('2024-03-20'),
        measurement: 'oz',
        amount: 16
    });

    const savedWater1 = water1.save();
    const savedWater2 = water2.save();
    const savedWater3 = water3.save();
    const savedWater4 = water4.save();

    const trainer1Id = trainer._id;
    const trainer2Id = trainer2._id;

    const recipe1 = new Recipe({
        date: new Date('2024-03-21'),
        name: 'Quinoa Salad',
        description: 'A nutritious salad made with quinoa, fresh vegetables, and a tangy vinaigrette.',
        trainerUsername: trainer1Id
    });

    const recipe2 = new Recipe({
        date: new Date('2024-03-22'),
        name: 'Vegetable Curry',
        description: 'A flavorful curry dish packed with assorted vegetables and aromatic spices.',
        trainerUsername: trainer2Id
    });

    const recipe3 = new Recipe({
        date: new Date('2024-03-23'),
        name: 'Berry Smoothie',
        description: 'A refreshing smoothie made with mixed berries, yogurt, and a hint of honey.',
        trainerUsername: trainer1Id
    });

    const recipe4 = new Recipe({
        date: new Date('2024-03-24'),
        name: 'Grilled Veggie Wrap',
        description: 'Grilled vegetables wrapped in a whole wheat tortilla with hummus spread.',
        trainerUsername: trainer1Id
    });

    const savedRecipe1 = await recipe1.save();
    const savedRecipe2 = await recipe2.save();
    const savedRecipe3 = await recipe3.save();
    const savedRecipe4 = await recipe4.save();



    // Add post data
    const post1 = new Post({
        trainerUsername: savedTrainer,
        title: 'Intense Cardio Workout',
        description: 'A high-intensity cardio workout for advanced users.',
        creationDate: new Date(),
        post_type: 'workout',
        comments: [saveComment1],
        likes: 10,
        workout_id: workout3
    });

    const Post2 = new Post({
        trainerUsername: savedTrainer2,
        title: 'Beginner Strength Training',
        description: 'A basic strength training routine for beginners.',
        creationDate: new Date(),
        post_type: 'workout',
        comments: [saveComment2],
        likes: 15,
        workout_id: workout2
    });

    const Post3 = new Post({
        trainerUsername: savedTrainer,
        title: 'Core Strengthening Exercises',
        description: 'Exercises to strengthen your core muscles.',
        creationDate: new Date(),
        post_type: 'workout',
        comments: [saveComment3],
        likes: 5,
        workout_id: workout1
    });

    const Post4 = new Post({
        trainerUsername: savedTrainer2,
        title: 'Upper Body',
        description: 'Best arm workout!',
        creationDate: new Date(),
        post_type: 'workout',
        comments: [saveComment4],
        likes: 20,
        workout_id: workout4
    });

    const Post5 = new Post({
        trainerUsername: savedTrainer2,
        title: 'Abs of Steel',
        description: 'Beginner friendly core workout',
        creationDate: new Date(),
        post_type: 'workout',
        comments: [saveComment5],
        likes: 20,
        workout_id: workout5
    });
    const savePost1 = await post1.save();
    const savepost2 = await Post2.save();
    const savepost3 = await Post3.save();
    const savepost4 = await Post4.save();
    const savepost5 = await Post5.save();

    const tracking1 = new Tracking({
        username: trainer._id,
        date: new Date('2024-03-18'),
        food_id: savedFood1._id,
        water_id: savedWater1._id,
        weight_id: savedWeight1._id,
        workout_id: savedw1._id,
        recipe_id: savedRecipe1._id
    })

    const tracking2 = new Tracking({
        username: trainer2._id,
        date: new Date('2024-03-17'),
        food_id: savedFood2._id,
        water_id: savedWater2._id,
        weight_id: savedWeight2._id,
        workout_id: savedw2._id,
        recipe_id: savedRecipe2._id
    })

    await tracking1.save()
    await tracking2.save()

    const savedWorkout1 = new SavedWorkout({
        user: savedUser._id,
        post_id: [post1._id, post2._id]
    });

    const savedWorkout2 = new SavedWorkout({
        user: savedUser._id,
        post_id: [post2._id, post3._id, post4._id, post5._id]
    });

    const savedWorkout3 = new SavedWorkout({
        user: savedTrainer._id,
        post_id: [post3._id, post5._id]
    });

    const savedWorkout4 = new SavedWorkout({
        user: saveduser2._id,
        post_id: [post4._id]
    });

    const savedWorkout5 = new SavedWorkout({
        user: saveduser2._id,
        post_id: [post5._id, post2._id, post1._id]
    });

    const savedSW1 = await savedWorkout1.save();
    const savedSW2 = await savedWorkout2.save();
    const savedSW3 = await savedWorkout3.save();
    const savedSW4 = await savedWorkout4.save();
    const savedSW5 = await savedWorkout5.save();


    // Optionally, you can close the connection when done
    await mongoose.connection.close();
    console.log('Connection closed');
}
