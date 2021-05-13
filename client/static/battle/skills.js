var mage = {
    MagicVolt: {
        name: 'Magic Volt',
        id: 'MagicVolt',
        level: 0,
        cost: 2,
        damage: 1.5,
        target: 1,
        type: 'magical',
        description: 'Fires a volt of magic at high velocity'
    },
    FireBall: {
        name: 'Fire Ball',
        id: 'FireBall',
        level: 1,
        cost: 5,
        damage: 2,
        target: 1,
        type: 'magical',
        description: 'Enhance the magic volt with the element of fire to deal large damage'
    },
    ThunderBolt:{
        name: 'Thunder Bolt',
        id: 'ThunderBolt',
        level: 1,
        cost: 3,
        damage: 1.7,
        target: 1,
        type: 'magical',
        description: 'Chains the element of lighting, deals damage up to 1 enemies'
    },

}
var warrior = {
    HardSlash: {
        name: 'Hard Slash',
        id: 'HardSlash',
        level: 0,
        cost: 2,
        damage: 1.2,
        target: 1,
        type: 'physical',
        description: 'You slash pretty hard'
    },
    FocusSlash: {
        name: 'Focus Slash',
        id: 'FocusSlash',
        level: 2,
        cost: 3,
        damage: 1.4,
        target: 1,
        type: 'physical',
        description: 'Focus your mind, releashing 1 powerful slash at the enemy'
    },
    VerticalSlash: {
        name: 'Vertical Slash',
        id: ' VerticalSlash',
        level: 1,
        cost: 2,
        damage: 1.3,
        target: 1,
        type: 'physical',
        description: 'A vertical slash down'
    }
}
var rouge = {
    VitalStab: {
        name: 'Vital Stab',
        id: 'VitalStab',
        level: 0,
        cost: 2,
        damage: 1.25,
        target: 1,
        type: 'physical',
        description: 'A stab at a vital area'
    },
    StrongThrust: {
        name: 'Strong Thrust',
        id: 'StrongThrust',
        level: 2,
        cost: 4,
        damage: 1.5,
        target: 1,
        type: 'physical',
        description: 'Full frontal lundge with your weapon'
    },
    BackSlash: {
        name: 'Back Slash',
        id: 'BackSlash',
        level: 2,
        cost: 5,
        damage: 1.65,
        target: 1,
        type: 'physical',
        description: 'Sneak up behind the enemy and slash them with all your might'
    }
}
var bard = {
    GuitarSmash: {
        name: 'Guitar Smash',
        id: 'GuitarSmash',
        level: 0,
        cost: 1,
        damage: 1.2,
        target: 1,
        type: 'physical',
        description: 'When you too fustrated, tired, or lazy to play a note so you smash them over the head'
    },
    NoteOne: {
        name: 'Note One',
        id: 'NoteOne',
        level: 1,
        cost: 2,
        damage: 1.35,
        target: 1,
        type: 'magical',
        description: 'The first note. Strong, Stern, and Foward. Powerful enough to cause pain'
    },
    LoudTune: {
        name: 'Loud Tune',
        id: 'LoudTune',
        level: 2,
        cost: 2,
        damage: 1.55,
        target: 1,
        type: 'magical',
        description: 'Spike up the volume to burst several ear drums'
    }
}
var mageskills = [mage.MagicVolt, mage.FireBall, mage.ThunderBolt]
var warskills = [warrior.HardSlash, warrior.FocusSlash, warrior.VerticalSlash]
var rouskills = [rouge.VitalStab, rouge.StrongThrust, rouge.BackSlash]
var bardskills = [bard.GuitarSmash, bard.NoteOne, bard.LoudTune]
