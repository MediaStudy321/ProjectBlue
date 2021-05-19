var weaponsstuff = {
    Hands: {
        id: 1,
        name: 'Hands',
        attackname: "Catch these Hands",
        phy_dmg: 0,
        mag_dmg: 0,
        type: 'physical',
        crit: 5,
        crit_chance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        discription: 'The most reliable weapon in the world is your hands. Square up fool!'
    },
    Stick: {
        id: 2,
        name: 'Long Stick',
        attackname: "Bash",
        phy_dmg: 3,
        mag_dmg: 0,
        type: 'physical',
        crit: 5,
        crit_chance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        discription: "It's a stick, just beat them over the head with it."
    }
}

var helmet = {
    Skin: {
        id: 1,
        name: 'Skin',
        phy_res: 0,
        mag_res: 0,
        crit: [0],
        crit_dis: 0,
        discription: "Yep, you have no cover..."
    }
}

var armor = {
    Skin: {
        id: 1,
        name: 'Skin',
        phy_res: 0,
        mag_res: 0,
        discription: "Yep, you have no cover..."
    }
}

var pant = {
    Skin: {
        id: 1,
        name: 'Skin',
        phy_res: 0,
        mag_res: 0,
        dex: 0,
        discription: "Yep, you have no cover..."
    }
}

var weaponeq = [weaponsstuff.Hands, weaponsstuff.Stick]
var helmeteq = [helmet.Skin]
var armoreq = [armor.Skin]
var panteq = [pant.Skin]
