$(async () => {

    const framedelay = 400;
    const happyIcon = "&#9786;";
    const deadIcon = "&#9760;";
    const timeout = 100000;

    var party = [];
    var monster = [];
    var battleStage = "opening";
    var clockRunning = true;
    var currentActors = [];
    var turns = [];

    var frames = 0;
    var countdown = 1;

    function intdice(dex) {
        var dice = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        var roll = dice[Math.floor(Math.random() * dice.length)];
        var move = Math.floor(dex * (roll / 10));
        return move;
    }

    function atkdice() {
        var dice = [1, 2, 3, 4, 5, 6];
        var roll = dice[Math.floor(Math.random() * dice.length)];
        return roll;
    }
    function defdice() {
        var dice = [8,9,10,11,12];
        var roll = dice[Math.floor(Math.random() * dice.length)];
        return roll;
    }

    function load() {
        loadPlayer();
        loadMonster();
        if (turns.length == 0) {
            setturns();
        }
    }

    function loadPlayer() {
        party.push(player);
        party.forEach(element => {
            element.faction = 'party';
            element.stance = 'waiting';

            element.hp = element.max_hp;
            element.mp = element.max_mp;

            loadweapon(element);
            element.move = intdice(player.dex);
            console.log(player.name + " rolled a: " + element.move);

        })
    }

    function loadweapon(element) {
        var weaponusing = element.weaponname
        var a = 0;
        while (a < weapons.length) {
            if (weaponusing == weapons[a].name) {
                element.weapon = weapons[a];
                console.log(element.weapon);
                break;
            }
            else {
                a++;
            }
        }
    }

    function loadMonster() {
        function selectmonster() {
            return monsters[Math.floor(Math.random() * monsters.length)];
        }

        monster.push(selectmonster());
        monster.push(selectmonster());

        monster.forEach(element => {
            element.faction = 'monster';
            element.stance = 'waiting';

            element.hp = element.max_hp;
            element.mp = element.max_mp;

            element.move = intdice(element.dex);

            loadweapon(element);

            console.log(element.name + " has rolled: " + element.move);
        })

    }


    function setturns() {
        function sorting(array) {
            var sorted_actors = [];
            while (array.length > 0) {
                var biggest_number = null;
                var index = 0;
                for (var a = 0; a < array.length; a++) {
                    if (biggest_number == null) {
                        biggest_number = array[0];
                        index = 0;
                    }
                    else if (array[a].move > biggest_number.move) {
                        biggest_number = array[a];
                        index = a;
                    }
                }
                sorted_actors.push(biggest_number);
                console.log(array[index].name);
                array.splice(index, 1);
            }
            return sorted_actors;
        }
        var actors = [];
        for (var a = 0; a < party.length; a++) {
            actors.push(party[a]);

        }
        for (var a = 0; a < monster.length; a++) {
            actors.push(monster[a]);
        }

        turns = sorting(actors);
        console.log("turns: ")
        console.log(turns[0])
        console.log(turns[1])
        console.log(turns[2])
        console.log("turns//")

    }

    function frame() {
        switch (battleStage) {
            case 'opening':
                if (countdown == 0) {
                    $('#banner').html('Battle begins...');
                    battleStage = "fighting";
                }
                else countdown--;
                break;
            case 'fighting':
                if (clockRunning) runClock();
                else runAction();
                if (frames > timeout) battleStage = 'stalemate';
                break;
            case 'stalemate':
                window.alert('Battle ends in stalemate');
                battleState = 'end';
                break;
            case 'victory':
                window.alert('You win!');
                battleStage = 'end';
                break;
            case 'defeat':
                window.alert('You lose!');
                battleStage = 'end';
                break;
            case 'end':
                clearInterval(battle);
                console.log('battle over');
                window.location = "mission.html"
                break;
        }
        frames++;
        heroStats(party);
    }

    var clockTicks = 0;

    function nextturn() {
        var first = turns[0];

        turns.shift();

        turns.push(first);


    }

    function runClock() {
        let partyActive = 0;
        let monstersActive = 0;

        for (let i = 0; i < party.length; i++) {
            if (party[i].hp > 0) {
                partyActive++;
                if (party[i] == turns[0]) {
                    clockRunning = false;
                    party[i].stance = 'ready';
                    let reference = ['party', i]
                    currentActors.push(reference);
                }
            }
        }

        for (let i = 0; i < monster.length; i++) {
            if (monster[i].hp > 0) {
                monstersActive++;
                if (monster[i] == turns[0]) {
                    clockRunning = false;
                    monster[i].stance = 'ready';
                    let reference = ['monster', i]
                    currentActors.push(reference);
                }
            }
            else {
                nextturn();
            }
        }


        if (partyActive == 0) battleStage = 'defeat';
        else if (monstersActive == 0) battleStage = 'victory';
        clockTicks++;
    }

    function runAction() {
        console.log("run action")
        if (currentActors.length > 0) {
            let currentReference = currentActors[currentActors.length - 1];
            var current;
            if (currentReference[0] == 'party') current = party[currentReference[1]];
            else current = monster[currentReference[1]];
            switch (current.stance) {
                case 'ready':
                    $('#banner').html(current.name + ' is ready!');
                    if (current.faction == "party") displayControls(current);
                    current.stance = 'active';
                    drawField();
                    nextturn();
                    break;
                case 'active':
                    console.log(current.name)
                    if (current.faction == "monster") {
                        console.log("monster turn")
                        current.type = "physical"
                        doAttack(current, randomHero());
                    }
                    break;
                case 'finished':
                    console.log(current.name + " finished")
                    current.stance = 'waiting';
                    currentActors.pop();
                    drawField();
                    console.log("next turn");
                    nextturn();
                    console.log("turn shift");
                    break;
                case 'fainted':
                    currentActors.pop();
                    drawField();
                    break;
            }
        }

        else clockRunning = true;

    }

    function displayHeroes() {
        $('#heroIcons').html('');
        for (let i = 0; i < party.length; i++) {
            let hero = party[i]

            let icon;
            if (hero.hp > 0) icon = happyIcon; else icon = deadIcon;
            let id = "hero_" + i;
            let avatar = "<span class='avatar' id='" + id + "'>" + icon + "</span>";
            $('#heroIcons').append(avatar);
            $('#' + id).css('color', hero.color);
            if (hero.stance == "active") $('#' + id).css('text-decoration', 'underline');
        }
    }

    function displayEnemies() {
        $('#monsters').html('');
        for (let i = 0; i < monster.length; i++) {
            let enemy = monster[i]
            let icon;
            if (enemy.hp > 0) icon = enemy.icon; else icon = deadIcon;
            let id = 'monster_' + i;
            let avatar = "<span class='avatar' id='" + id + "'>" + icon + "</span>";
            $('#monsters').append(avatar);
            $('#' + id).css('color', enemy.color);
            if (enemy.stance == "active") $('#' + id).css('text-decoration', 'underline');
        }
    }

    function drawField() {
        displayHeroes();
        displayEnemies();
        displayturnbar()

    }

    function displayturnbar() {
        $('#turnbar').html('');
        var position = "<tr><th>Turns";
        turns.forEach(element => {
            position += "<th>" + element.name + "</th>"
        });
        position += "</tr>"
        $('#turnbar').append(position);
    }

    function heroStats() {
        $('#heroStats').html('');
        party.forEach(element => {
            let stats = "<tr><th>" + element.name + "</th><td>" +
                "[HP: " + element.hp + "/" + element.max_hp + "] [" +
                "MP: " + element.mp + "/" + element.max_mp + "]</td><td>" +
                element.stance + "</td></tr>"
            $('#heroStats').append(stats);
        });
    }

    function monsterStats(){
        $('#monsterStats').html('');
        console.log("stats")
        monster.forEach(element => {
            let stats = element.name + "\n" +
                "[HP: " + element.hp + "/" + element.max_hp + "] \n [" +
                "MP: " + element.mp + "/" + element.max_mp + "]"
            $('#monsterStats').append(stats);
        });
    }



    function doAttack(attacker, defender) {
        var dmgnum = damage(defender, attacker,dmgnum)
        if (defender.hp <= 0) {
            $('#banner').html(attacker.name + ' slays ' + defender.name + '!');
            defender.stance = 'fainted';
        }
        else $('#banner').html(attacker.name + ' attacks ' + defender.name + ' for ' + dmgnum + ' damage.');
        attacker.stance = 'finished';
    }

    function damage(defender, attacker) {
        var roll = atkdice();
        var dmg = 0;
        var crit = attacker.weapon.crit_chance[Math.floor(Math.random() * attacker.weapon.crit_chance.length)]
        console.log("crit: " + crit + " roll: "+roll);
        if (attacker.type == "physical") {
            console.log("physical dmg")
                dmg = attacker.phy_atk
                if(crit == 1){
                    dmg = Math.floor(dmg * 1.5);
                }
        }
        else if (attacker.type == "magical") {
            dmg = ((attacker.mag_atk * Math.floor(roll/2))/Math.floor(defender.mag_def * defdice()/10)) - defender.mag_def + + attacker.weapon.mag_dmg;
                if(crit == 1){
                    dmg = Math.floor(dmg * 1.5);
                }
        }
        if(dmg < 1){
            dmg = 1;
        }
        console.log(dmg);
        defender.hp -= dmg;
        console.log(defender.hp)
        return dmg;
    }

    function displayControls(hero) {
        $('#banner').html(hero.name+' is up!');
        $('#controls').html('');  
        

        $('#controls').append("<button id='attackbutton'>Attack</button>");
        hero.type = "physical"
        $('#attackbutton').on('click', ()=>{
            for(let i=0; i<monster.length; i++) {
                $('#monster_'+i).on('click', (click)=>{
                    doAttack(hero, monster[i]);
                    hero.stance = 'finished';
                   
                    displayEnemies();
                    $('#controls').html('');
                });
                $('#attackbutton').on('click', displayControls(hero));
                $('#attackbutton').html('cancel attack')
            }
        })
    }

    function randomHero() {
        let choice = Math.floor(Math.random() * party.length);
        return party[choice];
    }






    await load();
    $('#banner').html('You have been attacked by ' + monster.length + ' beasties!');
    drawField();
    heroStats();
    //monsterStats();
    var battle = setInterval(frame, framedelay)

})