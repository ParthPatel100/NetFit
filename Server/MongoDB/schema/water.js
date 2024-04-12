const mongoose = require('mongoose');

const waterSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    date: { type: Date, required: true },
    measurement: {
        type: String, 
        required: true,
        enum: ['cup', 'L', 'ml', 'oz']
    },
    amount: {type: Number, required: true, min: 0}
    
});


module.exports = mongoose.model('water', waterSchema);
