const mongoose = require('mongoose');
const path = require("path");
const Water = require("./schema/water");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

async function main() {
    // Connect to MongoDB

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);
    console.log("Connected to MongoDB");


    const water = [
        {
            userId: "65fbb5e8684d1930c6047600",
            date: new Date('2024-01-12'),
            measurement: 'ml',
            amount: 1500,
        },
        {
            userId: "65fbb5e8684d1930c6047600",
            date: new Date('2024-01-15'),
            measurement: 'ml',
            amount: 1600
        },
        {
            userId: "65fbb5e8684d1930c6047600",
            date: new Date('2024-02-15'),
            measurement: 'ml',
            amount: 1543
        },
        {
            userId: "65fbb5e8684d1930c6047600",
            date: new Date('2024-02-16'),
            measurement: 'ml',
            amount: 1780
        }
    ];

    await Water.insertMany(water)
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


