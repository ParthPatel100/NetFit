const mongoose = require('mongoose');

const waterSchema = new mongoose.Schema({
    _id: {type: String},
    date: { type: Date, required: true },
    measurement: {
        type: String, 
        required: true,
        enum: ['cup', 'L', 'ml', 'oz']
    },
    amount: {type: Number, required: true, min: 0}
    
});


module.exports = mongoose.model('water', waterSchema);