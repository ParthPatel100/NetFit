const savedWorkoutSchema = new mongoose.Schema({ 
    post_id: {type: mongoose.Schema.Types.ObjectId, ref: 'post'},
});
module.exports = mongoose.model('SavedWorkout', savedWorkoutSchema);
