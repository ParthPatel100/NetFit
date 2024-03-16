const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    following_list: [mongoose.Schema.Types.ObjectId],
    user_role: { type: String, enum: ['user', 'admin', 'trainer'] },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    age: { type: Number },
    experienceLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'] }
});

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);