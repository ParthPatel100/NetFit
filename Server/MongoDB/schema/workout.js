const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    exercise: { type: String, required: true },
    reps: { type: Number, default: 0 },
    sets: { type: Number, default: 0 },
    weights: { type: Number, default: 0 },
    rest: { type: Number, default: 0 }
});

module.exports = mongoose.model('workout', workoutSchema);
