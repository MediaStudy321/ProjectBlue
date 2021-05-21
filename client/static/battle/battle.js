$(async () => {

    const framedelay = 400;
    const happyIcon = "images/Player-1.png";
    var deadIcon = "images/Dead.png";
    const timeout = 100000;
    var finalboss = false;
    var bossbattle = false

    var player = [];
    var monster = [];
    var battleStage = "opening";
    var clockRunning = true;
    var currentActors = [];
    var turns = [];
    var skillarray = [];
    var exppool = 0;

    var frames = 0;
    var countdown = 1;

    function checkboss() {
        if (sessionStorage.getItem("boss") != "") {
            bossbattle = true;
            if (sessionStorage.getItem("boss") == "KingSlime") {
                monster = bossf
            }
            else if (sessionStorage.getItem("boss") == "Dragon") {
                monster = bossc
            }
            else if (sessionStorage.getItem("boss") == "Mecha") {
                monster = bossm
            }
            else if (sessionStorage.getItem("boss") == "Final") {
                monster = fboss
                finalboss = true
            }
            return true

        }
        else{
            return false
        }
    }

    function loadboss() {
        monster.forEach(element => {
            element.faction = 'monster';
            element.stance = 'waiting';

            element.hp = element.max_hp;
            element.mp = element.max_mp;

            loadstatusELM(element);

            element.move = intdice(element.dex);

            loadweapon(element);

            exppool += element.exp;

            console.log(element.name + " has rolled: " + element.move);
        })
    }

    function intdice(dex) {
        var dice = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        var roll = dice[Math.floor(Math.random() * dice.length)];
        var move = Math.floor(dex * (roll / 10));
        return move;
    }

    function monsterselect() {
        var dice = [1, 2, 3];
        var roll = dice[Math.floor(Math.random() * dice.length)];
        return roll;
    }

    function atkdice() {
        var dice = [0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3];
        var roll = dice[Math.floor(Math.random() * dice.length)];
        return roll;
    }

    async function load() {
        try {
            await $.ajax({
                url: '/getcharacter',
                type: 'GET',
                success: (data) => {
                    player = data;
                    loadPlayer(player);
                }
            });
        }
        catch (e) {
            console.log(e);
            window.alert("I'm sorry, the server is down!");
        }
        if (checkboss() == true) {
            loadboss();
        }
        else {
            loadMonster();
        }
        if (turns.length == 0) {
            setturns();
        }
    }

    function loadPlayer(element) {
        element.faction = 'party';
        element.stance = 'waiting';


        loadstatusELM(element)

        loadequipments(element);

        loadskills(element);

        element.hp = element.stats.max_hp + element.armor.bonus_hp;
        element.mp = element.stats.max_mp;

        element.move = intdice(element.stats.dex + element.pants.dex);
        element.phy_res = element.helmet.phy_res + element.armor.phy_res + element.pants.phy_res
        element.mag_res = element.helmet.mag_res + element.armor.mag_res + element.pants.mag_res
        console.log(element.name + " rolled a: " + element.move);

    }


    function loadskills(hero) {
        if (hero.class == "Mage") {
            mageskills.forEach(element => {
                if (hero.level >= element.level) {
                    skillarray.push(element);
                }
            })
        }
        else if (hero.class == "Warrior") {
            warskills.forEach(element => {
                if (hero.level >= element.level) {
                    skillarray.push(element);
                }
            })
        }
        else if (hero.class == "Rouge") {
            rouskills.forEach(element => {
                if (hero.level >= element.level) {
                    skillarray.push(element);
                }
            })
        }
        else if (hero.class == "Bard") {
            bardskills.forEach(element => {
                if (hero.level >= element.level) {
                    skillarray.push(element);
                }
            })
        }
        hero.skill = skillarray;
    }

    function loadequipments(element) {
        var weaponusing = element.equipments.weapon
        var wearhelment = element.equipments.helmet
        var weararmor = element.equipments.armor
        var wearpant = element.equipments.pant
        var weap = 0;
        while (weap < weaponeq.length) {
            if (weaponusing == weaponeq[weap].name) {
                element.weapon = weaponeq[weap];
                console.log(element.weapon);
                break;
            }
            else {
                weap++;
            }
        }
        var helm = 0
        while (helm < helmeteq.length) {
            if (wearhelment == helmeteq[helm].name) {
                element.helmet = helmeteq[helm];
                console.log(element.helmet);
                break;
            }
            else {
                helm++;
            }
        }
        var armor = 0
        while (armor < armoreq.length) {
            if (weararmor == armoreq[armor].name) {
                element.armor = armoreq[armor];
                console.log(element.armor);
                break;
            }
            else {
                armor++;
            }
        }
        var pants = 0;
        while (pants < panteq.length) {
            if (wearpant == panteq[pants].name) {
                element.pants = panteq[pants];
                console.log(element.pants);
                break;
            }
            else {
                pants++;
            }
        }
    }
    //for monsters

    function loadweapon(element) {
        var weaponusing = element.weaponname
        var a = 0;
        while (a < weaponeq.length) {
            if (weaponusing == weaponeq[a].name) {
                element.weapon = weaponeq[a];
                console.log(element.weapon);
                break;
            }
            else {
                a++;
            }
        }
    }

    function loadMonster() {
        function selectmonster(monsters) {
            return monsters[Math.floor(Math.random() * monsters.length)];
        }
        var total = monsterselect();

        function repeatcheck(mon) {
            for (a = 0; a < monster.length; a++) {
                if (monster[a] == mon) {
                    return true;
                }
            }
            return false;
        }
        function loadmonsterintoarray() {
            var location = map = sessionStorage.getItem("map");
            if (location == "forest") {
                for (a = 0; a < total; a++) {
                    var newmon = selectmonster(forestmob);
                    if (monster.length == 0) {
                        monster.push(newmon);
                    }
                    else {
                        var checks = repeatcheck(newmon);
                        while (checks == true) {
                            newmon = selectmonster(forestmob);
                            checks = repeatcheck(newmon);
                        }
                        monster.push(newmon);
                    }
                }
            }
            else if (location == "cave") {
                for (a = 0; a < total; a++) {
                    var newmon = selectmonster(cavemob);
                    if (monster.length == 0) {
                        monster.push(newmon);
                    }
                    else {
                        var checks = repeatcheck(newmon);
                        while (checks == true) {
                            newmon = selectmonster(cavemob);
                            checks = repeatcheck(newmon);
                        }
                        monster.push(newmon);
                    }
                }
            }
            else if (location == "mountain") {
                for (a = 0; a < total; a++) {
                    var newmon = selectmonster(mounatinmob);
                    if (monster.length == 0) {
                        monster.push(newmon);
                    }
                    else {
                        var checks = repeatcheck(newmon);
                        while (checks == true) {
                            newmon = selectmonster(mounatinmob);
                            checks = repeatcheck(newmon);
                        }
                        monster.push(newmon);
                    }
                }
            }
        }
        loadmonsterintoarray();

        monster.forEach(element => {
            element.faction = 'monster';
            element.stance = 'waiting';

            element.hp = element.max_hp;
            element.mp = element.max_mp;

            loadstatusELM(element);

            element.move = intdice(element.dex);

            loadweapon(element);

            exppool += element.exp;

            console.log(element.name + " has rolled: " + element.move);
        })

    }

    function loadstatusELM(element) {
        if (element.status == null) {
            element.status = "";
            element.statusturn = "";
        }
    }

    function applystatus(element, status) {
        if (element.status == "") {
            element.status = "[ " + status.name + ": ";
            element.statusturn = status.turn + " ]";
        }
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
        actors.push(player)
        for (var a = 0; a < monster.length; a++) {
            actors.push(monster[a]);
        }

        turns = sorting(actors);
        console.log("turns: ")
        for (a = 0; a < turns.length; a++) {
            console.log(turns[a]);
        }
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
                window.alert('You win! \n Exp Gained: +' + exppool + '\n Gold Gained: +' + Math.floor(exppool * atkdice()));
                player.exp += exppool;
                battleStage = 'end';
                map = sessionStorage.getItem("map")
                boss = sessionStorage.getItem("boss")
                if (map == "forest") {
                    player.stages.forest += 1;
                }
                if (map == "mountain") {
                    player.stages.mountain += 1;
                }
                if (map == "cave") {
                    player.stages.cave += 1;
                }
                if (boss == "KingSlime"){
                    player.stages.kingslime += 1;
                }
                if (boss == "Dragon"){
                    player.stages.greendragon += 1;
                }
                if (boss == "Mecha"){
                    player.stages.mechaking += 1;
                }
                if (boss == "Final") {
                    player.stages.finalboss += 1;
                }
                $.ajax({
                    type: 'POST',
                    url: 'characterupdates',
                    data: player,
                });
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
        heroStats(player);
    }

    var clockTicks = 0;

    function nextturn() {
        var first = turns[0];

        turns.shift();

        turns.push(first);

        console.log(turns[0].name + " turn to move")


    }

    function runClock() {
        let partyActive = 0;
        let monstersActive = 0;

        if (player.hp > 0) {
            partyActive++;
            if (player == turns[0]) {
                clockRunning = false;
                player.stance = 'ready';
                let reference = ['party']
                currentActors.push(reference);
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
        }


        if (partyActive == 0) battleStage = 'defeat';
        else if (monstersActive == 0) battleStage = 'victory';
        clockTicks++;
    }

    function runAction() {
        console.log("run action")
        console.log(currentActors.length)
        if (currentActors.length > 0) {
            let currentReference = currentActors[currentActors.length - 1];
            var current;
            if (currentReference[0] == 'party') current = player;
            else current = monster[currentReference[1]];
            console.log(current.stance);
            switch (current.stance) {
                case 'ready':
                    $('#banner').html(current.name + ' is ready!');
                    if (current.faction == "party") displayControls(current);
                    current.stance = 'active';
                    drawField();
                    break;
                case 'active':
                    console.log(current.name)
                    if (current.faction == "monster") {
                        current.type = "physical"
                        doAttack(current, player, 1);
                    }
                    break;
                case 'finished':
                    console.log(current.name + " finished")
                    current.stance = 'waiting';
                    currentActors.pop();
                    drawField();
                    nextturn();
                    break;
                case 'fainted':
                    console.log(current.name + " fainted")
                    currentActors.pop();
                    drawField();
                    break;
            }
        }

        else clockRunning = true;

    }

    function displayHeroes() {
        $('#heroIcons').html('');
        let hero = player

        let img;
        if (hero.hp > 0) img = happyIcon; else img = deadIcon;
        let avatar = "<img src = '" + img + "' width = 250px height = 150px/>";
        $('#heroIcons').append(avatar);
    }

    function displayEnemies() {
        $('#monsters').html('');
        for (let i = 0; i < monster.length; i++) {
            let enemy = monster[i]
            let img;
            if(finalboss == true){
                deadIcon = "images/Kdonut.png"
            }
            if (enemy.hp > 0) img = enemy.img; else img = deadIcon;
            let id = 'monster_' + i;
            var avatar = "<img id='" + id + "' src = '" + img + "'width = 250px height = 150px'/>";
            if (bossbattle == true) {
                avatar = "<img id='" + id + "' src = '" + img + "'width = 400px height = 300px'/>";
            }
            $('#monsters').append(avatar);
            $('#' + id).css('color', enemy.color);
            if (enemy.stance == "active") $('#' + id).css('text-decoration', 'underline');
        }
    }

    function displaymap() {
        map = sessionStorage.getItem("map")
        if (map == "forest") {
            document.body.style.backgroundImage = 'url("images/forest.jpg")'
        }
        else if (map == "mountain") {
            document.body.style.backgroundImage = 'url("images/mountain.png")'
        }
        else if (map == "cave") {
            document.body.style.backgroundImage = 'url("images/caves.jpg")'
        }
        else if (map == "final") {
            document.body.style.backgroundImage = 'url("images/cario.jpg")'
        }

    }

    function drawField() {
        displayHeroes();
        displayEnemies();
        displayturnbar();
        displaymap();

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
        let stats = "<tr><th>" + player.name + "</th><td style='width:70%'>" + player.status + " "
            + player.statusturn + "</td><td style = 'text-align: center;'>" + player.stance + "</td></tr>" +
            "<tr><td>HP: [ " + player.hp + " / " + player.stats.max_hp + " ] </br> " +
            "MP: [ " + player.mp + " / " + player.stats.max_mp + " ]</td><td><td><tr>"
        $('#heroStats').append(stats);
        monstats();
    }
    function monstats() {
        $('#monsterStats').html('');
        var stat = "<tr>";
        monster.forEach(element => {
            stat += "<td><table><tr><th>" + element.name + "</th></tr>" +
                "<tr><td> Level: [ " + element.level + " ]" +
                "<br>" +
                "HP: [ " + element.hp + " / " + element.max_hp + " ]" +
                "</br>" +
                "MP: [ " + element.mp + " / " + element.max_mp + " ]" + "</td></tr>" +
                "<tr><td>" + element.stance + "</td></tr></table></td>"
        });
        stat += "</tr>"
        $('#monsterStats').append(stat);

    }
    function doAttack(attacker, defender, damagemod) {
        var dmgnum = 0;
        if (attacker.faction == 'monster') {
            dmgnum = monsterdamage(defender, attacker, damagemod)
        }
        else {
            dmgnum = playerdamage(defender, attacker, damagemod)
        }
        if (defender.hp <= 0) {
            $('#banner').html(attacker.name + ' slays ' + defender.name + '!');
            defender.stance = 'fainted';
            for (a = 0; a < turns.length; a++) {
                if (turns[a] == defender) {
                    turns.splice(a, 1);
                }
            }
        }
        else $('#banner').html(attacker.name + ' attacks ' + defender.name + ' for ' + dmgnum + ' damage.');
        attacker.stance = 'finished';
    }
    function playerdamage(defender, attacker, damagemod) {
        var roll = atkdice();
        var dmg = 0;
        var crit = attacker.weapon.crit_chance[Math.floor(Math.random() * attacker.weapon.crit_chance.length)]
        var crit2 = attacker.helmet.crit[Math.floor(Math.random() * attacker.helmet.crit.length)]
        if (attacker.type == "physical") {
            console.log("physical dmg")
            dmg = (((attacker.stats.physical_atk * damagemod) + attacker.weapon.phy_dmg) * roll - defender.phy_def)
            if (crit == 1 || crit2 == 1) {
                dmg = Math.floor(dmg * 1.5);
            }
            dmg = dmg * (1 - (defender.phy_res / 100))
        }
        else if (attacker.type == "magical") {
            dmg = (((attacker.stats.magical_atk * damagemod) + attacker.weapon.mag_dmg) * roll - defender.mag_def)
            if (crit == 1) {
                dmg = Math.floor(dmg * 1.5);
            }
            dmg = dmg * (1 - (defender.mag_res / 100))
        }
        if (dmg < 1) {
            dmg = 1;
        }
        dmg = Math.floor(dmg)
        console.log("damage: " + dmg);
        defender.hp -= dmg;
        console.log("hp: " + defender.hp)
        if (defender.hp < 0) {
            defender.hp = 0;
        }
        return dmg;
    }
    function monsterdamage(defender, attacker, damagemod) {
        var roll = atkdice();
        var dmg = 0;
        var crit = attacker.weapon.crit_chance[Math.floor(Math.random() * attacker.weapon.crit_chance.length)]
        console.log("crit: " + crit + " roll: " + roll);
        if (attacker.type == "physical") {
            console.log("physical dmg")
            dmg = (((attacker.phy_atk * damagemod) + attacker.weapon.phy_dmg) * roll - defender.stats.physical_def)
            if (crit == 1) {
                dmg = Math.floor(dmg * 1.5);
            }
        }
        else if (attacker.type == "magical") {
            dmg = (((attacker.mag_atk * damagemod) + attacker.weapon.mag_dmg) * roll - defender.stats.magical_def)
            if (crit == 1) {
                dmg = Math.floor(dmg * 1.5);
            }
        }
        if (dmg < 1) {
            dmg = 1;
        }
        dmg = Math.floor(dmg)
        console.log("damage: " + dmg);
        defender.hp -= dmg;
        console.log("hp: " + defender.hp)
        if (defender.hp < 0) {
            defender.hp = 0;
        }
        return dmg;
    }

    function displayControls(hero) {
        $('#banner').html(hero.name + ' is up!');
        $('#controls').html('');

        var buttonvalue = 0;

        var wepname = hero.weapon.attackname;


        $('#attackbutton').on('click', () => {
            if (hero.stance == "active") {
                hero.type = "physical"
                $('#controls').html("<button id='basicattack'>" + wepname +
                    "</button> [Physical: + " + hero.weapon.phy_dmg +
                    " Damage ]<p>" + hero.weapon.discription + "</p>");
                $('#basicattack').on('click', () => {
                    buttonvalue = 1;
                    for (let i = 0; i < monster.length; i++) {
                        $('#monster_' + i).on('click', (click) => {
                            if (buttonvalue == 1) {
                                doAttack(hero, monster[i], 1);
                                hero.stance = 'finished';

                                displayEnemies();
                                $('#controls').html('');
                                $('#attackbutton').html('Attack')
                            }
                        });
                        $('#basicattack').on('click', displayControls(hero));
                        $('#controls').html('<p> Select an enemy <p>');
                        $('#attackbutton').html('cancel attack')
                        $('#attackbutton').on('click', () => {
                            $('#attackbutton').html('Attack');
                            buttonvalue = 0;
                            displayControls(hero);
                        })


                    }

                })
            }

        })

        $('#skillbutton').on('click', () => {
            if (hero.stance == "active") {
                var skills = "";
                hero.skill.forEach(element => {
                    skills += "<button id='" + element.id + "' >" + element.name +
                        "</button> [ " + element.type + ": + " + (element.damage * 100) + "% ] -- [ Cost: " +
                        element.cost + "] -- " + element.description + "</br>"
                })
                $('#controls').html(skills);
                hero.skill.forEach(element => {
                    $('#' + element.id).on('click', () => {
                        buttonvalue = 1;
                        if (element.cost > hero.mp) {
                            alert("not enough mana!")
                            displayControls(hero);
                        }
                        else {
                            hero.type = element.type;
                            for (let i = 0; i < monster.length; i++) {
                                $('#monster_' + i).on('click', (click) => {
                                    if (buttonvalue == 1) {
                                        doAttack(hero, monster[i], element.damage);
                                        hero.stance = 'finished';

                                        displayEnemies();
                                        $('#controls').html('');
                                        $('#skillbutton').html('Skill')
                                        hero.mp -= element.cost;
                                    }
                                });
                                $('#' + element.name).on('click', displayControls(hero));
                                $('#controls').html('<p> Select an enemy <p>');
                                $('#skillbutton').html('cancel attack')
                                $('#skillbutton').on('click', () => {
                                    $('#skillbutton').html('Skill');
                                    buttonvalue = 0;
                                    displayControls(hero);
                                })


                            }
                        }
                    })
                })
            }
        })
        $('#itembutton').on('click', () => {
            if (hero.stance == "active") {
                console.log("clicakble")
                window.alert("No Items!");
            }
        })
        $('#escapebutton').on('click', () => {
            if (hero.stance == "active") {
                window.alert("Escaped!")
                window.location = "mission.html";
            }
        })

    }

    await load();
    $('#banner').html('You have been attacked by ' + monster.length + ' beasties!');
    drawField();
    heroStats();
    var battle = setInterval(frame, framedelay)

})