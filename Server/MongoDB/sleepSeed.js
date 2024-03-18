const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    const Sleep = require('./schema/sleep'); 
    await mongoose.connect("mongodb://admin:password@localhost:27017/app_db?authSource=admin");

    Sleep.insertMany([
        {
            date: new Date('2024-03-18'),  // Today's date 
            startTime: '11:15 PM',
            duration: 7.5  // Hours
        },
        {
            date: new Date('2024-03-17'),  // Yesterday
            startTime: '10:45 PM',
            duration: 8
        },
        // Add more sample sleep data as needed
    ]).then(function () {
        console.log("Data inserted") // Success
    }).catch(function (error) {
        console.log(error)     // Failure
    });
}