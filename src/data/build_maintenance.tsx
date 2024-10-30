
interface build_maintenance {
    gold: number;
    wood: number;
    clay: number;
    iron: number;
}

interface build_maintenances {
    parliament: build_maintenance;
    barracks: build_maintenance;
    castle: build_maintenance;
    tower: build_maintenance;
    espionage: build_maintenance;
    farm: build_maintenance;
}
export const build_maintenance: build_maintenances = {
    parliament: {
        gold: 0,
        wood: 3,
        clay: 4,
        iron: 1,
    },
    barracks: {
        gold: 5,
        wood: 1,
        clay: 3,
        iron: 5,
    },
    castle: {
        gold: 80,
        wood: 8,
        clay: 12,
        iron: 9,
    },
    tower: {
        gold: 50,
        wood: 8,
        clay: 6,
        iron: 3,
    },
    espionage: {
        gold: 30,
        wood: 3,
        clay: 4,
        iron: 0,
    },
    farm: {
        gold: 0,
        wood: 1,
        clay: 1,
        iron: 0,
    }
};
