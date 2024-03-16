const savedWorkoutSchema = new mongoose.Schema({ 
    workouts: [{type: mongoose.Schema.Types.ObjectId, ref: 'workouts'}],
});
module.exports = mongoose.model('SavedWorkout', savedWorkoutSchema);
