const express = require('express');
const {mobs,weapons,player} = require('./gameconstants');

const router = express.Router();



router.get('/getplayer', (req, res)=>{
    
    let party = [player.character]
    res.send(party);

});

router.get('/getmobs', (req, res)=>{

    let party = [mobs.Goblin]
    res.send(party);
    
});

module.exports = router;