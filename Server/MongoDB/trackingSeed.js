const mongoose = require('mongoose');
const Tracking = require("./schema/tracking");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://admin:password@localhost:27017/app_db?authSource=admin");

    Tracking.insertMany([
        {
            username: '65f7768b916fa2b26e9cf83f',
            date: new Date(),
            water_id: '65f7829f8465f3af23843136'
        }
    ]).then(function () {
        console.log("Data inserted") // Success
    }).catch(function (error) {
        console.log(error)     // Failure
    });
}