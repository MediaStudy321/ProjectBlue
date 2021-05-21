const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;



const characterSchema = new mongoose.Schema({
    stages: {
        forest: {
            type: Number,
            default: 0
        },
        cave: {
            type: Number,
            default: 0
        },
        mountain: {
            type: Number,
            default: 0
        },
        kingslime: {
            type: Number,
            default: 0
        },
        greendragon: {
            type: Number,
            default: 0
        },
        mechaking: {
            type: Number,
            default: 0
        },
        finalboss: {
            type: Number,
            default: 0
        }

    },
    name: {
        type: String,
    },
    class: {
        type: String,
    },
    level: {
        type: Number,
        default: 0
    },
    exp: {
        type: Number,
        default: 0
    },
    stats: {
        max_hp: {
            type: Number,
            default: 0
        },
        max_mp: {
            type: Number,
            default: 0
        },
        physical_atk: {
            type: Number,
            default: 0
        },
        physical_def: {
            type: Number,
            default: 0
        },
        magical_atk: {
            type: Number,
            default: 0
        },
        magical_def: {
            type: Number,
            default: 0
        },
        dex: {
            type: Number,
            default: 0
        },
        roll: {
            type: Number,
            default: 0
        }
    },
    equipments: {
        weapon: {
            type: String,
            default: 'Hands'
        },
        helmet: {
            type: String,
            default: "Skin"
        },
        armor: {
            type: String,
            default: "Skin"
        },
        pant: {
            type: String,
            default: "Skin"
        }
    }

});

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    character: {
        type: characterSchema
    },
    isModerator: {
        type: Boolean,
        default: false
    }
});

const partySchema = new mongoose.Schema({
    members: {
        type: [ObjectID]
    }
})

const UserProfile = mongoose.model("UserProfile", profileSchema, "userprofile");





module.exports = { UserProfile }