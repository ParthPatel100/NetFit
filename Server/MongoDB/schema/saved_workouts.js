const savedWorkoutSchema = new mongoose.Schema({ 
    post_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
});
module.exports = mongoose.model('SavedWorkout', savedWorkoutSchema);
