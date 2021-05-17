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
    character: {
        type: Boolean,
        default: false
    },
    isModerator: {
        type: Boolean,
        default: false
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
    characterclass: {
        type: String,
        default: 1
    }, 
    stats: {
        max_hp: {
            type: Number,
            default: 1
        },
        max_mp: {
            type: Number,
            default: 1
        },
        level: {
            type: Number,
            default: 0
        }, 
        exp: {
            type: Number,
            default: 0
        },
        max_hp: {
            type: Number,
            default: 1
        }, 
        max_mp: {
            type: Number,
            default: 1
        },
        physical_atk: {
            type: Number,
            default: 1
        },
        physical_def: {
            type: Number,
            default: 1
        },
        magical_atk: {
            type: Number,
            default: 1
        },
        magical_def: {
            type: Number,
            default: 1
        },
        dex: {
            type: Number,
            default: 1
        },
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