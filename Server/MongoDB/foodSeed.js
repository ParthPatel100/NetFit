const Food = require("./schema/foods");
const mongoose = require('mongoose');
const path = require("path");
const Sleep = require("./schema/sleep");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

async function main() {
    // Connect to MongoDB

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);
    console.log("Connected to MongoDB");

    const food = [
        {
            userId: "65fbb5e8684d1930c6047600",
            name: 'Broccoli',
            date: new Date('2024-03-18'),
            calories: 50,
            meal_type: 'lunch',
            measurement: 'g',
            amount: 100,
            protein: 3,
            carb: 6,
            fat: 0
        },
        {
            userId: "65fbb5e8684d1930c6047600",
            name: 'Salmon',
            date: new Date('2024-03-17'),
            calories: 200,
            meal_type: 'dinner',
            measurement: 'g',
            amount: 150,
            protein: 20,
            carb: 0,
            fat: 12
        },
        {
            userId: "65fbb5e8684d1930c6047600",
            name: 'Apple',
            date: new Date('2024-03-19'),
            calories: 80,
            meal_type: 'snack',
            measurement: 'each',
            amount: 1,
            protein: 0,
            carb: 22,
            fat: 0
        },
        {
            userId: "65fbb5e8684d1930c6047600",
            name: 'Pasta',
            date: new Date('2024-03-20'),
            calories: 250,
            meal_type: 'dinner',
            measurement: 'cup',
            amount: 1,
            protein: 7,
            carb: 42,
            fat: 2
        },
        {
            userId: "65fbb5e8684d1930c6047600",
            name: 'Chicken Salad',
            date: new Date('2024-03-16'),
            calories: 180,
            meal_type: 'lunch',
            measurement: 'g',
            amount: 200,
            protein: 20,
            carb: 8,
            fat: 9
        }
    ];

    await Food.insertMany(food)
        .then(result => {
            console.log('Documents saved successfully:', result);
        })
        .catch(error => {
            console.error('Error saving documents:', error);
        });

    // Optionally, you can close the connection when done
    await mongoose.connection.close();
    console.log('Connection closed');
}

main().catch(err => console.log(err));


