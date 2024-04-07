const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}, // we need references
    calories: {type: Number},
    carbohydrates: {type: Number}, // we need references
    fat: {type: Number}, // we need references
    protein: {type: Number}, // we need references
    sugar: {type: Number},
    calories_burn: {type: Number},
    workouts: {type: Number},
    workout_duration: {type: Number},
    sleep: {type: Number},
    weight: {type: Number},
    water: {type: Number},
});

module.exports = mongoose.model('goals', goalSchema);
