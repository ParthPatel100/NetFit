const mongoose = require('mongoose');
const path = require("path");
const SavedWorkouts = require("./schema/saved_workouts");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

async function main() {
    // Connect to MongoDB

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);
    console.log("Connected to MongoDB");
    const sw = [
        {
          post_id: ["66199092d78b1645e0d5d6c8", "66199092d78b1645e0d5d6c9"],
          user: "65fbb5e8684d1930c6047600",
        },
      ];

    await SavedWorkouts.insertMany(sw)
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


