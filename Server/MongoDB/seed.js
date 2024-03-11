const mongoose = require('mongoose');



main().catch(err => console.log(err));

async function main() {
    const User = require('./schema/user');
    // Connect to MongoDB
    await mongoose.connect("mongodb://admin:password@localhost:27017/app_db?authSource=admin");
    console.log("Connected to MongoDB");

    const newUser = new User({
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123',
        following_list: [], // Empty following list for now
        user_role: 'user' // Assign user role
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    console.log('User created:', savedUser);

    // Optionally, you can close the connection when done
    await mongoose.connection.close();
    console.log('Connection closed');
}