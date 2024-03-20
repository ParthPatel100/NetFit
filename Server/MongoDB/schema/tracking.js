const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}, // we need references
    date: {type: Date, unique: true, required: true}, // I think it should be required even if there is nothing in it so that if nothign is returned then we know
    food_id: {type: mongoose.Schema.Types.ObjectId, ref: 'food'}, // we need references
    water_id: {type: mongoose.Schema.Types.ObjectId, ref: 'water'}, // we need references
    sleep_id: {type: mongoose.Schema.Types.ObjectId, ref: 'sleep'}, // we need references
    weight_id: {type: mongoose.Schema.Types.ObjectId, ref: 'weight'}, // we need references
    workout_id: {type: mongoose.Schema.Types.ObjectId, ref: 'workout'}, // we need references
    recipe_id: {type: mongoose.Schema.Types.ObjectId, ref: 'recipe'} // we need references

});

module.exports = mongoose.model('tracking', trackingSchema);
