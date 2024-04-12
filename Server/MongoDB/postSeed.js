const mongoose = require('mongoose');
const path = require("path");
const Post = require("./schema/post");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

async function main() {
    // Connect to MongoDB

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);
    console.log("Connected to MongoDB");


    const posts = [
        {
          trainerUsername: "660a3a3ffd5ff21bb7e9bc4c",
          title: "45 Minute Morning",
          description: "Check out my latest workout session. It was intense!",
          creationDate: new Date(),
          post_type: "workout",
          images: [],
          comments: [],
          likes: 0,
          workout_id: [
            "661950a27e94c56287c969fc",
          ],
        },
        {
            trainerUsername: "660a3a3ffd5ff21bb7e9bc4c",
            title: "Intense Workout Session 2",
            description: "Check out my latest workout session. It was intense!",
            creationDate: new Date(),
            post_type: "workout",
            images: [],
            comments: [],
            likes: 0,
            workout_id: [
              "661950a27e94c56287c969fd",
              "661950a27e94c56287c969fe",
            ],
          },
      ];

    await Post.insertMany(posts)
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


