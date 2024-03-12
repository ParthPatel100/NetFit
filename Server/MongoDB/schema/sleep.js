const mongoose = require('mongoose');

const sleepSchema = new mongoose.Schema({
    _id: {type: String},
    date: { type: Date, required: true },
    startTime: { type: String },
    duration: { type: Number, required: true}
});

module.exports = mongoose.model('sleep', sleepSchema);