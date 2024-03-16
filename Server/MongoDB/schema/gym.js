const mongoose = require('mongoose');

//for this schema not sure if we are going to include, but if we do we need a function to check the user has a trainer role
const gymSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    name: { type: String, required: true},
    reps: { type: Number, min: 0},
    sets: { type: Number, min: 0},
    resistance: {type: Number},
    resMeasure: {type: String, enum: ['lb', 'kg']},
    duration: {type: Date, min: 0}

});

module.exports = mongoose.model('gym', gymSchema);
