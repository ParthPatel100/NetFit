const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    name: [{ type: String, required: true}],
    reps: [{ type: Number, min: 0}],
    sets: [{ type: Number, min: 0}],
    resistance: [{type: Number}],
    resMeasure: [{type: String, enum: ['lb', 'kg']}],
    duration: [{type: Date, min: 0}]
});

module.exports = mongoose.model('workout', workoutSchema);
