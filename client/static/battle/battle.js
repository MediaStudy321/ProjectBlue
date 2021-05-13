$(async () => {

    const framedelay = 400;
    const happyIcon = "images/Player.png";
    const deadIcon = "images/Dead.png";
    const timeout = 100000;

    var party = [];
    var monster = [];
    var battleStage = "opening";
    var clockRunning = true;
    var currentActors = [];
    var turns = [];
    var skillarray = [];
    var exppool = 0;

    var frames = 0;
    var countdown = 1;

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

            loadstatusELM(element)

            loadweapon(element);

            loadskills(element);
            element.move = intdice(player.dex);
            console.log(player.name + " rolled a: " + element.move);

        })
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
            for (a = 0; a < total; a++) {
                var newmon = selectmonster();
                if (monster.length == 0) {
                    monster.push(newmon);
                }
                else {
                    var checks = repeatcheck(newmon);
                    while (checks == true) {
                        newmon = selectmonster();
                        checks = repeatcheck(newmon);
                    }
                    monster.push(newmon);
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
        for (var a = 0; a < party.length; a++) {
            actors.push(party[a]);

        }
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
                var gainedexp = parseInt(sessionStorage.getItem("exp")) + exppool;
                sessionStorage.setItem("exp",gainedexp)
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

        console.log(turns[0].name + " turn to move")


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
            if (currentReference[0] == 'party') current = party[currentReference[1]];
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
                        doAttack(current, randomHero(), 1);
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
        for (let i = 0; i < party.length; i++) {
            let hero = party[i]

            let img;
            if (hero.hp > 0) img = happyIcon; else img = deadIcon;
            let id = "hero_" + i;
            let avatar = "<img id='" + id + "' src = '" + img + "'/>";;
            $('#heroIcons').append(avatar);
            $('#' + id).css('color', hero.color);
            if (hero.stance == "active") $('#' + id).css('text-decoration', 'underline');
        }
    }

    function displayEnemies() {
        $('#monsters').html('');
        for (let i = 0; i < monster.length; i++) {
            let enemy = monster[i]
            let img;
            if (enemy.hp > 0) img = enemy.img; else img = deadIcon;
            let id = 'monster_' + i;
            let avatar = "<img id='" + id + "' src = '" + img + "'/>";
            $('#monsters').append(avatar);
            $('#' + id).css('color', enemy.color);
            if (enemy.stance == "active") $('#' + id).css('text-decoration', 'underline');
        }
    }


    function drawField() {
        displayHeroes();
        displayEnemies();
        displayturnbar();

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
            let stats = "<tr><th>" + element.name + "</th><td style='width:70%'>" + element.status + " "
                + element.statusturn + "</td><td style = 'text-align: center;'>" + element.stance + "</td></tr>" +
                "<tr><td>HP: [ " + element.hp + " / " + element.max_hp + " ] </br> " +
                "MP: [ " + element.mp + " / " + element.max_mp + " ]</td><td><td><tr>"
            $('#heroStats').append(stats);
        });
        monstats();
    }
    function monstats() {
        $('#monsterStats').html('');
        var stat = "<tr>";
        monster.forEach(element => {
            stat += "<td><table><tr><th>" + element.name + "</th></tr>" +
                "<tr><td>HP: [ " + element.hp + " / " + element.max_hp + " ]" +
                "</br>" +
                "MP: [ " + element.mp + " / " + element.max_mp + " ]" + "</td></tr>" +
                "<tr><td>" + element.stance + "</td></tr></table></td>"
        });
        stat += "</tr>"
        $('#monsterStats').append(stat);

    }
    function doAttack(attacker, defender, damagemod) {
        var dmgnum = damage(defender, attacker, damagemod)
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
    function damage(defender, attacker, damagemod) {
        var roll = atkdice();
        var dmg = 0;
        var crit = attacker.weapon.crit_chance[Math.floor(Math.random() * attacker.weapon.crit_chance.length)]
        console.log("crit: " + crit + " roll: " + roll);
        if (attacker.type == "physical") {
            console.log("physical dmg")
            dmg = (((attacker.phy_atk * damagemod) + attacker.weapon.phy_dmg) * roll - defender.phy_def)
            if (crit == 1) {
                dmg = Math.floor(dmg * 1.5);
            }
        }
        else if (attacker.type == "magical") {
            dmg = (((attacker.mag_atk * damagemod) + attacker.weapon.mag_dmg) * roll - defender.mag_def)
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
            hero.type = "physical"
            $('#controls').html("<button id='basicattack' style='font-size: 0.9em;'>" + wepname +
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
        })

        $('#skillbutton').on('click', () => {
            var skills = "";
            hero.skill.forEach(element => {
                skills += "<button id='" + element.id + "' style='font-size: 0.9em;'' >" + element.name +
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
        })
        $('#itembutton').on('click', () => {
            alert("No Items!");
        })
        $('#escapebutton').on('click', () => {
            alert("Escaped!")
            window.location = "mission.html";
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
    var battle = setInterval(frame, framedelay)

})