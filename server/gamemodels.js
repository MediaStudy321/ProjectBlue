const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

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

const statSchema = new mongoose.Schema({
    max_hp: {
        type: Number,
        default: 1
    },
    max_mp: {
        type: Number,
        default: 1
    }
});

const characterSchema = new mongoose.Schema({
    player: {
        type: ObjectID
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    stats: {
        type: statSchema
    }
});

const partySchema = new mongoose.Schema({
    members: {
        type: [ObjectID]
    }
})

const UserProfile = mongoose.model("UserProfile", profileSchema, "userprofile");

const Character = mongoose.model('Character',characterSchema);

const Party = mongoose.model('Party',partySchema);


// const monsterSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         require: true,
//         unique: true
//     },
//     stats: {
//         type: statSchema
//     }
// });


module.exports = {UserProfile, Character, Party}