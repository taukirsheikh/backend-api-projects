const mongoose = require('mongoose');
const exerciseSchema = new mongoose.Schema({
    description: {type: String, required: true},
    duration: {type:Number, required: true},
    date: String,
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    count:{type: Number, default: 0},
    description: {type:String, required: false},
    duration: {type: Number, required: false},
    date: String,
    log:[exerciseSchema]
},{ versionKey: false });

module.exports = mongoose.model('User', userSchema, 'exercise_tracker');