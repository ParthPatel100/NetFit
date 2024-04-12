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
            userId: "660a3a3efd5ff21bb7e9bc45",
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
            userId: "660a3a3efd5ff21bb7e9bc45",
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
            userId: "660a3a3efd5ff21bb7e9bc45",
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
            userId: "660a3a3efd5ff21bb7e9bc45",
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
            userId: "660a3a3efd5ff21bb7e9bc45",
            name: 'Chicken Salad',
            date: new Date('2024-03-16'),
            calories: 180,
            meal_type: 'lunch',
            measurement: 'g',
            amount: 200,
            protein: 20,
            carb: 8,
            fat: 9
        },
        // Seed data for April 11, 12, 13
        {
            userId: "660a3a3efd5ff21bb7e9bc45",
            name: 'Cereal',
            date: new Date('2024-04-11'),
            calories: 150,
            meal_type: 'breakfast',
            measurement: 'cup',
            amount: 1,
            protein: 5,
            carb: 30,
            fat: 2
        },
        {
            userId: "660a3a3efd5ff21bb7e9bc45",
            name: 'Sandwich',
            date: new Date('2024-04-11'),
            calories: 300,
            meal_type: 'lunch',
            measurement: 'each',
            amount: 1,
            protein: 15,
            carb: 40,
            fat: 10
        },
        {
            userId: "660a3a3efd5ff21bb7e9bc45",
            name: 'Pizza',
            date: new Date('2024-04-11'),
            calories: 500,
            meal_type: 'dinner',
            measurement: 'oz',
            amount: 2,
            protein: 25,
            carb: 60,
            fat: 20
        },
        {
            userId: "660a3a3efd5ff21bb7e9bc45",
            name: 'Apple',
            date: new Date('2024-04-11'),
            calories: 80,
            meal_type: 'snack',
            measurement: 'each',
            amount: 1,
            protein: 0,
            carb: 22,
            fat: 0
        },
        {
            userId: "660a3a3efd5ff21bb7e9bc45",
            name: 'Oatmeal',
            date: new Date('2024-04-12'),
            calories: 200,
            meal_type: 'breakfast',
            measurement: 'cup',
            amount: 1,
            protein: 5,
            carb: 35,
            fat: 3
        },
        {
            userId: "660a3a3efd5ff21bb7e9bc45",
            name: 'Chicken Salad',
            date: new Date('2024-04-12'),
            calories: 250,
            meal_type: 'lunch',
            measurement: 'g',
            amount: 200,
            protein: 20,
            carb: 10,
            fat: 12
        },
        {
            userId: "660a3a3efd5ff21bb7e9bc45",
            name: 'Steak',
            date: new Date('2024-04-12'),
            calories: 400,
            meal_type: 'dinner',
            measurement: 'g',
            amount: 250,
            protein: 30,
            carb: 0,
            fat: 20
        },
        {
            userId: "660a3a3efd5ff21bb7e9bc45",
            name: 'Yogurt',
            date: new Date('2024-04-12'),
            calories: 120,
            meal_type: 'snack',
            measurement: 'g',
            amount: 150,
            protein: 8,
            carb: 15,
            fat: 4
        },
        {
            userId: "660a3a3efd5ff21bb7e9bc45",
            name: 'Eggs',
            date: new Date('2024-04-13'),
            calories: 300,
            meal_type: 'breakfast',
            measurement: 'each',
            amount: 2,
            protein: 12,
            carb: 2,
            fat: 25
        },
        {
            userId: "660a3a3efd5ff21bb7e9bc45",
            name: 'Salad',
            date: new Date('2024-04-13'),
            calories: 200,
            meal_type: 'lunch',
            measurement: 'g',
            amount: 150,
            protein: 5,
            carb: 15,
            fat: 10
        },
        {
            userId: "660a3a3efd5ff21bb7e9bc45",
            name: 'Fish',
            date: new Date('2024-04-13'),
            calories: 350,
            meal_type: 'dinner',
            measurement: 'g',
            amount: 200,
            protein: 25,
            carb: 10,
            fat: 15
        },
        {
            userId: "660a3a3efd5ff21bb7e9bc45",
            name: 'Almonds',
            date: new Date('2024-04-13'),
            calories: 150,
            meal_type: 'snack',
            measurement: 'g',
            amount: 30,
            protein: 6,
            carb: 4,
            fat: 12
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