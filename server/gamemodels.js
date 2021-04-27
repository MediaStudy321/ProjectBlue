const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

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


module.exports = {Character, Party}