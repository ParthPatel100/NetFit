const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    date: { type: Date, required: true },
    measurement: {
        type: String, 
        required: true,
        enum: ['lb', 'kg', 'st']
    },
    amount: { type: Number, required: true},

});

module.exports = mongoose.model('weight', weightSchema);
