interface soldier_power {
    attack: number;
    defence: number;
}

interface soldier_powers {
    spearman: soldier_power;
    bowman: soldier_power;
    swordman: soldier_power;
    axeman: soldier_power;
    knight: soldier_power;
    catapult: soldier_power;
}

export const soldier_power: soldier_powers = {
    spearman: {
        attack: 10,
        defence: 40,
    },
    bowman: {
        attack: 20,
        defence: 30,
    },
    swordman: {
        attack: 35,
        defence: 75,
    },
    axeman: {
        attack: 45,
        defence: 10,
    },
    knight: {
        attack: 95,
        defence: 40,
    },
    catapult: {
        attack: 180,
        defence: 10,
    }
};
