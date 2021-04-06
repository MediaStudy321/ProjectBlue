const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    UserName:{
        type: String,
        require: true,
        unique: true
    }
});

const UserProfile = mongoose.model("UserProfile", profileSchema, "userprofile");

module.exports = {UserProfile};