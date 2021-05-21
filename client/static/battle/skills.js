var mage = {
    MagicVolt: {
        name: 'Magic Volt',
        id: 'MagicVolt',
        level: 0,
        cost: 2,
        damage: 1.3,
        target: 1,
        type: 'magical',
        description: 'Fires a volt of magic at high velocity'
    },
    FireBall: {
        name: 'Fire Ball',
        id: 'FireBall',
        level: 1,
        cost: 5,
        damage: 1.6,
        target: 1,
        type: 'magical',
        description: 'Enhance the magic volt with the element of fire to deal large damage'
    },
    ThunderBolt:{
        name: 'Thunder Bolt',
        id: 'ThunderBolt',
        level: 1,
        cost: 3,
        damage: 1.35,
        target: 1,
        type: 'magical',
        description: 'Chains the element of lighting, deals damage up to 1 enemies'
    },
    ArchFlare:{
        name: 'Arch Flare',
        id: 'ArchFlare',
        level: 6,
        cost: 8,
        damage: 1.9,
        target: 1,
        type: 'magical',
        description: 'Upgraded version of Fireball. Incinerate your foes.'
    },
    GigaEarth:{
        name: 'Giga Earth',
        id: 'GigaEarth',
        level: 10,
        cost: 14,
        damage: 2.5,
        target: 1,
        type: 'magical',
        description: 'Lefts the land and drops it on your foes, completely flattening all in the process.'
    },
    SuperNova:{
        name: 'Super Nova',
        id: 'SuperNova',
        level: 15,
        cost: 30,
        damage: 3.3,
        target: 1,
        type: 'magical',
        description: 'Concentrate your mana, once collected, obliterate all that you see.'
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
        id: 'VerticalSlash',
        level: 1,
        cost: 2,
        damage: 1.3,
        target: 1,
        type: 'physical',
        description: 'A vertical slash down'
    },
    TrueCrossSlash:{
        name: 'True Cross Slash',
        id: 'TrueCrossSlash',
        level: 6,
        cost: 6,
        damage: 1.65,
        target: 1,
        type: 'physical',
        description: 'The amount of time the enemy cross you is the amount you slice them up to'
    },
    TerraSmash:{
        name: 'Terra Smash',
        id: 'TerraSmash',
        level: 11,
        cost: 15,
        damage: 2.15,
        target: 1,
        type: 'physical',
        description: 'When you swing you sword so fast it becomes a blunt weapon'
    },
    DimensionCutter:{
        name: 'Dimension Cutter',
        id: 'DimensionCutter',
        level: 16,
        cost: 30,
        damage: 2.90,
        target: 1,
        type: 'physical',
        description: 'Cutting faster than light...accidently slices reality apart.'
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
    },
    MadSlashes: {
        name: 'Mad Slashes',
        id: 'MadSlashes',
        level: 6,
        cost: 10,
        damage: 2,
        target: 1,
        type: 'physical',
        description: 'The amount of slashes you deal in that one instance...is frightening'
    },
    CrazyCutter: {
        name: 'Crazy Cutter',
        id: 'CrazyCutter',
        level: 11,
        cost: 22,
        damage: 2.4,
        target: 1,
        type: 'physical',
        description: 'People will call you crazy if all you do is cut the absolute life out of them'
    },
    ThousandBlades: {
        name: '1000 Blades',
        id: '1000Blades',
        level: 16,
        cost: 30,
        damage: 2.95,
        target: 1,
        type: 'physical',
        description: 'Where do you even keep all the knifes?'
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
    },
    NoteTwo: {
        name: 'Note Two',
        id: 'NoteTwo',
        level: 6,
        cost: 6,
        damage: 1.7,
        target: 1,
        type: 'magical',
        description: 'The second power note of music fu, also the final note they hear'
    },
    NoteThree: {
        name: 'Note Three',
        id: 'NoteThree',
        level: 14,
        cost: 19,
        damage: 2.3,
        target: 1,
        type: 'magical',
        description: 'What is funnier than Note Two? Note Three. There to make sure they are in the grave'
    },
    OneOneDB: {
        name: '1100 DB',
        id: '1100DB',
        level: 17,
        cost: 35,
        damage: 3.65,
        target: 1,
        type: 'magical',
        description: 'That this point, what is existence. This loud of a sound creates blackholes. '
    }
}
var mageskills = [mage.MagicVolt, mage.FireBall, mage.ThunderBolt, mage.ArchFlare, mage.GigaEarth, mage.SuperNova]
var warskills = [warrior.HardSlash, warrior.FocusSlash, warrior.VerticalSlash, warrior.TrueCrossSlash, warrior.TerraSmash, warrior.DimensionCutter]
var rouskills = [rouge.VitalStab, rouge.StrongThrust, rouge.BackSlash, rouge.MadSlashes, rouge.CrazyCutter, rouge.ThousandBlades]
var bardskills = [bard.GuitarSmash, bard.NoteOne, bard.LoudTune, bard.NoteTwo, bard.NoteThree, bard.OneOneDB]
