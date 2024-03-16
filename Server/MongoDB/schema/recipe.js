const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    date: { type: Date, required: true},
    name: { type: String, required: true},
    description: {type: String},
    trainerUsername: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}, //check trainer role
    ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: 'food'}]

});

module.exports = mongoose.model('recipe', recipeSchema);
