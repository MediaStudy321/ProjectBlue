const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isModerator: {
        type: Boolean,
        default: false
    }
});

const UserProfile = mongoose.model("UserProfile", profileSchema, "userprofile");

module.exports = {UserProfile};