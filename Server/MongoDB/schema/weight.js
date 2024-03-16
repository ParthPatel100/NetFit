const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    measurement: {
        type: String, 
        required: true,
        enum: ['lb', 'kg', 'st']
    },
    amount: { type: Number, required: true},
    images: [{ data: Buffer, contentType: String}]

});

module.exports = mongoose.model('weight', weightSchema);
