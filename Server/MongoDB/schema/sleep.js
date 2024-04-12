const mongoose = require('mongoose');

const sleepSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    date: { type: Date, required: true },
    startTime: { type: String },
    duration: { type: Number, required: true}
});

module.exports = mongoose.model('sleep', sleepSchema);
