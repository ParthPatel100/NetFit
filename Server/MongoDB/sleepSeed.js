const mongoose = require('mongoose');
const path = require("path");
const Sleep = require("./schema/sleep");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

async function main() {
    // Connect to MongoDB

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);
    console.log("Connected to MongoDB");


    const sleep = [
        {
            userId: "65fbb5e8684d1930c6047600",
            date: new Date('2024-01-12'),
            duration: 7.6,
        },
        {
            userId: "65fbb5e8684d1930c6047600",
            date: new Date('2024-02-12'),
            duration: 7.8,
        },
        {
            userId: "65fbb5e8684d1930c6047600",
            date: new Date('2024-01-16'),
            duration: 8.0,
        },
        {
            userId: "65fbb5e8684d1930c6047600",
            date: new Date('2024-01-16'),
            duration: 8.0,
        },
        {
            userId: "65fbb5e8684d1930c6047600",
            date: new Date('2024-03-21'),
            duration: 7.8,
        }
    ];

    await Sleep.insertMany(sleep)
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


