var player = {
    name: "",
    class: "",
    level: 0,
    max_hp: 0,
    max_mp: 0,
    phy_atk: 0,
    phy_def: 0,
    mag_atk: 0,
    mag_def: 0,
    dex: 0,
    exp: 0,
    exp_level: 0,
    cap_lv: 20,
    statroll: 0,
    icon: '&#9752;',
    color: '#33B2FF'
}

const mobs = {
    Goblin: {
        id: 1,
        name: 'Goblin',
        level: 1,
        max_hp: 10,
        max_mp: 3,
        phy_atk: 5,
        phy_def: 1,
        mag_atk: 1,
        mag_def: 1,
        dex: 2,
        icon: '&#9752;',
        color: '#DDFFDD'
    }
}

const weapons = {
    Hands: {
        id: 1,
        name: 'Catch These Hands',
        phy_dmg: 0,
        mag_dmg: 0,
        crit_chance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        discription: 'The most reliable weapon in the world is your hands. Square up fool!'
    }
}

module.exports = { mobs, weapons, player }