const savedWorkoutSchema = new mongoose.Schema({
    _id: { type: String}, 
    workouts: [{type: mongoose.Schema.Types.ObjectId, ref: 'workouts'}],
});
module.exports = mongoose.model('SavedWorkout', savedWorkoutSchema);