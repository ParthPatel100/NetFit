const mongoose = require('mongoose');


const foodSchema = new mongoose.Schema({
    name: { type: String },
    date: { type: Date, required: true },
    calories: { type: Number, required: true, min: 1 },
    meal_type: { 
        type: String ,
        required: true,
        enum: ['breakfast', 'lunch', 'dinner', 'snack'] 
    },
    measurement: {
        type: String, 
        required: true,
        enum: ['cup', 'L', 'ml', 'tsp', 'tbsp', 'oz', 'lb', 'g', 'kg', 'each']
    },
    amount: {type: Number, required: true, min: 0},
    protein: {type: Number, required: true, min: 0},
    carb: {type: Number, required: true, min: 0}, 
    fat: {type: Number, required: true, min: 0},

    sodium: {type: Number, min: 0},
    sugar: {type: Number, min: 0},
    fibre: {type: Number, min: 0},
    satfat: {type: Number, min: 0},
    transfat: {type: Number, min: 0},
    cholesterol: {type: Number, min: 0},
    potassium: {type: Number, min: 0},
    iron: {type: Number, min: 0},
    vit_a: {type: Number, min: 0},
    vit_c: {type: Number, min: 0},
    calcium: {type: Number, min: 0},
    vit_d: {type: Number, min: 0},
    vit_k: {type: Number, min: 0},
    vit_b6: {type: Number, min: 0},
    vit_b12: {type: Number, min: 0}

});

module.exports = mongoose.model('food', foodSchema);






