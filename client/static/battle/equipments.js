var weaponsstuff = {
    Hands: {
        id: 1,
        name: 'Hands',
        attackname: "Catch these Hands",
        phy_dmg: 1,
        mag_dmg: 0,
        type: 'physical',
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
        crit_chance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        discription: "It's a stick, just beat them over the head with it."
    }
}

var weapons = [weaponsstuff.Hands, weaponsstuff.Stick]
