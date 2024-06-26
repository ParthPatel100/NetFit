const mongoose = require('mongoose');
const path = require("path");
const Workout = require("./schema/workout");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

async function main() {
    // Connect to MongoDB

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);
    console.log("Connected to MongoDB");


    const workouts = [
        {
            userId: "65fbb5e8684d1930c6047600",
            date: new Date('2024-04-15'),
            name: 'crunches',
            reps: 20,
            sets: 2,
            resistance: 0,
            resMeasure: 'lb',
            duration: 10,
            calories: 23

        },
        {
            userId: "65fbb5e8684d1930c6047600",
            date: new Date('2024-02-15'),
            name: 'run',
            reps: 30,
            sets: 2,
            resistance: 0,
            resMeasure: 'lb',
            duration: 12,
            calories: 46

        },
        {
            userId: "65fbb5e8684d1930c6047600",
            date: new Date('2024-02-11'),
            name: 'pushups',
            reps: 30,
            sets: 2,
            resistance: 0,
            resMeasure: 'lb',
            duration: 4,
            calories: 35

        },
        {
            userId: "65fbb5e8684d1930c6047600",
            date: new Date('2024-04-15'),
            name: 'tricep dips',
            reps: 20,
            sets: 2,
            resistance: 0,
            resMeasure: 'lb',
            duration: 15,
            calories: 67

        },
        {
            userId: "65fbb5e8684d1930c6047600",
            date: new Date('2024-04-15'),
            name: 'plank',
            reps: 20,
            sets: 2,
            resistance: 0,
            resMeasure: 'lb',
            duration: 5,
            calories: 25

        },
        {
            userId: "660a3a3ffd5ff21bb7e9bc4c",
            date: new Date("2024-04-10"),
            name: "Morning Jog",
            reps: 0,
            sets: 0,
            resistance: 0,
            resMeasure: "",
            duration: 30,
            calories: 250,
          },
          {
            userId: "660a3a3ffd5ff21bb7e9bc4c",
            date: new Date("2024-04-09"),
            name: "Bodyweight Workout",
            reps: 15,
            sets: 3,
            resistance: 0,
            resMeasure: "",
            duration: 45,
            calories: 300,
          },
          {
            userId: "660a3a3ffd5ff21bb7e9bc4c",
            date: new Date("2024-04-08"),
            name: "Yoga Session",
            reps: 0,
            sets: 0,
            resistance: 0,
            resMeasure: "",
            duration: 60,
            calories: 200,
          },
          {
            userId: "660a3a3ffd5ff21bb7e9bc4c",
            date: new Date("2024-04-12"),
            name: "Morning Run",
            duration: 45,
            calories: 300,
          },
          {
            userId: "660a3a3ffd5ff21bb7e9bc4c",
            date: new Date("2024-04-12"),
            name: "Squat Challenge",
            reps: 15,
            sets: 3,
            duration: 30,
            calories: 200,
          },
          {
            userId: "660a3a3ffd5ff21bb7e9bc4c",
            date: new Date("2024-04-12"),
            name: "Push-up Circuit",
            reps: 12,
            sets: 4,
            duration: 40,
            calories: 250,
          }
    ];

    await Workout.insertMany(workouts)
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


