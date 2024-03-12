const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    _id: { type: String},
    trainerUsername: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}, //check trainer role
    title: {type: String, required: true},
    description: { type: String},
    creationDate: { type: Date, required: true},
    post_type: { type: String, enum: ['workout', 'recipe']}, //are we doing meal plans?
    images: [{ data: Buffer, contentType: String}],
    video: {type: String}, ///would this be a url? I am confused how we incorporate the video if someone could help
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}],
    likes: {type: Number },
    workout_id: {type: mongoose.Schema.Types.ObjectId, ref: 'workout'}

});

module.exports = mongoose.model('post', postSchema);