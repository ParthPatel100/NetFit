const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    const Water = require('./schema/water');
    await mongoose.connect("mongodb://admin:password@localhost:27017/app_db?authSource=admin");

    Water.insertMany([
        {
            measurement: 'cup',
            amount: 8
        },
        {
            measurement: 'L',
            amount: 1.5
        },
        {
            measurement: 'ml',
            amount: 1000
        },
    ]).then(function () {
        console.log("Data inserted") // Success
    }).catch(function (error) {
        console.log(error)     // Failure
    });

}