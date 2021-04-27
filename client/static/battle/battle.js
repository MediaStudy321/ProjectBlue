$(async ()=>{

    const framedelay = 400;

    var party = [];
    var mobs =[];

    function InitailDICE(dexstats){

    }

    async function load() {
        try {
            await $.ajax({
                url: 'getmobs',
                type: 'GET',
                success: (data) =>{
                    mob=data;
                    mobSetup()
                    console.log("mob loaded");
                }
            });
        }
        catch(e) {
            console.log(e);
            window.alert("I'm sorry, the server is down!");
        }
    }

    

    function mobSetup() {
        monsters.forEach(element => {
            element.faction = 'mobs';
            element.stance = 'waiting';
            element.hp = element.max_hp;
            element.mp = element.max_mp;
            //  The monsters are a little slower initially.
            element.initiative = Math.floor(Math.random()*20)+10;
        })
           
    }

    load();

})