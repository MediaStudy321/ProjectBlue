var player = {
    name: sessionStorage.getItem("UserName"),
    class: sessionStorage.getItem("Class"),
    level: sessionStorage.getItem("Level"),
    exp: sessionStorage.getItem("exp"),
    max_hp: sessionStorage.getItem("hp"),
    max_mp: sessionStorage.getItem("mp"),
    phy_atk: sessionStorage.getItem("pa"),
    phy_def: sessionStorage.getItem("pd"),
    mag_atk: sessionStorage.getItem("ma"),
    mag_def: sessionStorage.getItem("md"),
    dex: sessionStorage.getItem("d"),
    weaponname: sessionStorage.getItem("Weapon"),
    icon: '&#9752;',
    color: 'blue'
}

var mobs = {
    Goblin: {
        name: 'Goblin',
        level: 1,
        max_hp: 12,
        max_mp: 3,
        phy_atk: 5,
        phy_def: 1,
        mag_atk: 1,
        mag_def: 1,
        dex: 2,
        weaponname: 'Hands',
        icon: '&#9752;',
        color: '#DDFFDD'
    },
    Slime: {
        name: 'Slime',
        level: 1,
        max_hp: 10,
        max_mp: 0,
        phy_atk: 1,
        phy_def: 3,
        mag_atk: 1,
        mag_def: 4,
        dex: 1,
        weaponname: 'Hands',
        icon: '&#9752;',
        color: '#DDFFDD'
    },
    Bug: {
        name: 'Bug',
        level: 1,
        max_hp: 7,
        max_mp: 3,
        phy_atk: 2,
        phy_def: 3,
        mag_atk: 1,
        mag_def: 2,
        dex: 2,
        weaponname: 'Hands',
        icon: '&#9752;',
        color: '#DDFFDD'
    }
}

var monsters = [mobs.Goblin, mobs.Slime, mobs.Bug];