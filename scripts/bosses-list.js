const bossesGeneralList = [
    { 
        id: 'heoni',
        minutes: 5,
        seconds: 45,
        displayName: 'Heoni',
        guideUrl: 'https://www.youtube.com/watch?v=H09LVfDpZl8',
        gifUrl: 'https://res.cloudinary.com/drojh09io/image/upload/v1708572875/tibia-bane-bosses-farming-timers/heoni.webp',
        tooltip: 'You can rest right below the stairs to be totally safe.',
        groupId: '',
        autoRestart: true
    },
    { 
        id: 'black-knight',
        minutes: 11,
        seconds: 30,
        displayName: 'Black Knight',
        guideUrl: 'https://www.youtube.com/watch?v=5FAeMzksGqc',
        gifUrl: 'https://res.cloudinary.com/drojh09io/image/upload/v1708572875/tibia-bane-bosses-farming-timers/black-knight.webp',
        tooltip: 'You can rest before the yellow doors on the floor on top and be totally safe.',
        groupId: '',
        autoRestart: true
    },
    { 
        id: 'diseased',
        minutes: 4,
        seconds: 0,
        displayName: 'Diseased',
        guideUrl: 'https://www.youtube.com/watch?v=NGFseS_XI7I,',
        gifUrl: 'https://res.cloudinary.com/drojh09io/image/upload/v1708877549/tibia-bane-bosses-farming-timers/diseased-bros.gif',
        tooltip: 'You can go above the stairs of entrance of the area to be totally safe.',
        groupId: '',
        autoRestart: true
    },
    { 
        id: 'glitterscale',
        minutes: 4,
        seconds: 0,
        displayName: 'Glitterscale',
        guideUrl: 'https://www.youtube.com/watch?v=1DT9wr9wiYE',
        gifUrl: 'https://res.cloudinary.com/drojh09io/image/upload/v1709265621/tibia-bane-bosses-farming-timers/glitterscale.webp',
        tooltip: 'There is a tile where you can stay and the boss will spawn and walk towards you, be careful if you go this route.',
        groupId: '',
        autoRestart: true
    },
    { 
        id: 'bane-lord',
        minutes: 25,
        seconds: 0,
        displayName: 'Bane Lord',
        guideUrl: 'https://www.youtube.com/watch?v=Pip3dN_StkU',
        gifUrl: 'https://res.cloudinary.com/drojh09io/image/upload/v1719877762/tibia-bane-bosses-farming-timers/bane_lord.gif',
        tooltip: 'The possibility of an event is exact so try to start the timer a few seconds before the cue.',
        groupId: '',
        autoRestart: true
    },
    {
        id: 'isle-of-evil',
        minutes: 15,
        seconds: 0,
        displayName: 'Isle of Evil',
        guideUrl: 'https://www.youtube.com/watch?v=KXu7MNfa2zc',
        gifUrl: 'https://res.cloudinary.com/drojh09io/image/upload/v1719877762/tibia-bane-bosses-farming-timers/isle_of_evil.gif',
        tooltip: 'Is much faster if you logout on top of the tower, wait for the timer, then go down to logout at the bottom, logout, wait and repeat.',
        groupId: '',
        autoRestart: true
    },
    {
        id: 'thawing-dragon-lord',
        minutes: 10,
        seconds: 0,
        displayName: 'T. Dragon Lord',
        guideUrl: 'https://youtu.be/TyOeoOyof28?si=ziovNoKbGIu85nEa&t=49',
        gifUrl: 'https://res.cloudinary.com/drojh09io/image/upload/v1730331867/tibia-bane-bosses-farming-timers/thawing_dragon_lord.webp',
        tooltip: 'You need to use the frozen dragon lord to start the fight, be careful being AFK cause others can troll you.',
        groupId: '',
        autoRestart: true
    },
    {
        id: 'dazed-leaf-golem',
        minutes: 6,
        seconds: 0,
        displayName: 'D. Leaf Golem',
        guideUrl: 'https://youtu.be/SXmTL55XuJg?si=oQ_x_VqTcfqGd-5V&t=48',
        gifUrl: 'https://res.cloudinary.com/drojh09io/image/upload/v1730331867/tibia-bane-bosses-farming-timers/dazed_leaf_golem.webp',
        tooltip: 'There is a tile where you can stay and the boss will spawn and walk towards you, be careful if you go this route.',
        groupId: '',
        autoRestart: true
    },
    {
        id: 'jailer',
        minutes: 6,
        seconds: 0,
        displayName: 'Jailer',
        guideUrl: 'https://www.youtube.com/watch?v=BkPEZIqHoVo&t=6s',
        gifUrl: 'https://res.cloudinary.com/drojh09io/image/upload/v1730331867/tibia-bane-bosses-farming-timers/jailer.webp',
        tooltip: 'You can rest in the boat and be totally safe.',
        groupId: '',
        autoRestart: true
    },
];

const fullMoonBossesList = [
    { 
        id: 'tamru-the-black',
        minutes: 30,
        seconds: 0,
        displayName: 'Tamru',
        guideUrl: 'https://www.youtube.com/watch?v=s77JxerP1KQ',
        gifUrl: 'https://res.cloudinary.com/drojh09io/image/upload/v1719878588/tibia-bane-bosses-farming-timers/tamru_the_black.gif',
        tooltip: 'You can rest at the boat safe zone to be totally safe.',
        groupId: "full-moon",
        autoRestart: false
    },
    { 
        id: 'ayana-the-crimson-curse',
        minutes: 30,
        seconds: 0,
        displayName: 'Ayana',
        guideUrl: 'https://www.youtube.com/watch?v=s77JxerP1KQ',
        gifUrl: 'https://res.cloudinary.com/drojh09io/image/upload/v1719878588/tibia-bane-bosses-farming-timers/ayana_the_crimson_curse.gif',
        tooltip: 'You can rest at the boat safe zone to be totally safe.',
        groupId: "full-moon",
        autoRestart: false
    },
    { 
        id: 'owin',
        minutes: 30,
        seconds: 0,
        displayName: 'Owin',
        guideUrl: 'https://www.youtube.com/watch?v=1kP6PObh4GY',
        gifUrl: 'https://res.cloudinary.com/drojh09io/image/upload/v1719878589/tibia-bane-bosses-farming-timers/owin.gif',
        tooltip: 'You can trap yourself with fire north of the spawn point and logout there.',
        groupId: "full-moon",
        autoRestart: false
    }
];
