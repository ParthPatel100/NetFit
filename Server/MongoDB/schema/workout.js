const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    date: { type: Date, required: true },
    name: { type: String, required: true},
    reps: { type: Number},
    sets: { type: Number},
    resistance: {type: Number},
    resMeasure: {type: String, enum: ['lb', 'kg', '']},
    duration: {type: Number},
    calories: {type: Number}
});

module.exports = mongoose.model('workout', workoutSchema);
