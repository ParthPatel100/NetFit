const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
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
