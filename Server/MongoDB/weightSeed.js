const mongoose = require('mongoose');
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

async function main() {
    // Connect to MongoDB
    const Weight = require("./schema/weight");

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);
    console.log("Connected to MongoDB");


    const weights = [
        {
            user_id: "65fbb5e8684d1930c6047600",
            date: new Date('2024-01-18'),
            measurement: 'kg',
            amount: 80,
        },
        {
            user_id: "65fbb5e8684d1930c6047600",
            date: new Date('2024-02-15'),
            measurement: 'kg',
            amount: 78
        },
        {
            user_id: "65fbb5e8684d1930c6047600",
            date: new Date('2024-03-15'),
            measurement: 'kg',
            amount: 76
        },
        {
            user_id: "65fbb5e8684d1930c6047600",
            date: new Date('2024-04-15'),
            measurement: 'kg',
            amount: 75
        }
    ];

    await Weight.insertMany(weights)
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


