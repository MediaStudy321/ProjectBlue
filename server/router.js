const express = require('express');
const {mobs,weapons,player} = require('./gameconstants');
const User = require('./gamemodels.js').UserProfile;

const router = express.Router();



router.get('/getplayer', (req, res)=>{
    
    let party = [player.character]
    res.send(party);

});

router.get('/getmobs', (req, res)=>{

    let party = [mobs.Goblin]
    res.send(party);
    
});

router.post('/charactersheet', async (req,res) => {
    try{
        User.findOne({username: req.session.username} , (error,result) => {
            if(error){
                res.send("Eroor")
                console.log(error)
            }
            else if(!result){
                res.redirect('/');
            }
            else{
                result.character = req.body;
                result.save();
                res.send('success')
            }
        })
        console.log(req.body)
    }
    catch(e){
        console.log(e)
        res.send("Server down")
    }
})

router.post('/getcharacter', async (req,res) => {
    try {
        let user = await User.findOne( {username: req.session.username})
        res.send(user.character);
        console.log(user)
    }
    catch(e){

    }
})

module.exports = router;