const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    _id: { type: String},
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}, //check trainer role
    description: {type: String, required: true},
    likes: { type: Number} // are we able to like comments , also are we allowing comment replies?

});

module.exports = mongoose.model('comment', commentSchema);