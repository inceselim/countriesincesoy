
interface soldier_maintenance {
    gold: number;
    wood: number;
    clay: number;
    iron: number;
    pop: number;
}

interface soldier_maintenances {
    spearman: soldier_maintenance;
    bowman: soldier_maintenance;
    swordman: soldier_maintenance;
    axeman: soldier_maintenance;
    knight: soldier_maintenance;
    catapult: soldier_maintenance;
}
export const soldier_maintenance: soldier_maintenances = {
    spearman: {
        gold: 2,
        wood: 1,
        clay: 0,
        iron: 0,
        pop: 1,
    },
    bowman: {
        gold: 3,
        wood: 0,
        clay: 1,
        iron: 0,
        pop: 2,
    },
    swordman: {
        gold: 3,
        wood: 0,
        clay: 0,
        iron: 2,
        pop: 1,
    },
    axeman: {
        gold: 4,
        wood: 2,
        clay: 0,
        iron: 0,
        pop: 3,
    },
    knight: {
        gold: 5,
        wood: 0,
        clay: 0,
        iron: 2,
        pop: 4,
    },
    catapult: {
        gold: 6,
        wood: 0,
        clay: 2,
        iron: 0,
        pop: 5,
    }
};
