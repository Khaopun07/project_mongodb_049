const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: String, required: true, enum: ['admin', 'user']}, // Use enum for role validation
}, {timestamps: true, versionKey: false});

module.exports = mongoose.model('User', userSchema);
