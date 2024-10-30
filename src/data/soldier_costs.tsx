export interface soldiers_types {
    spearman: string,
    bowman: string,
    swordman: string,
    axeman: string,
    knight: string,
    catapult: string
}
export interface resource_costs {
    gold: number;
    wood: number;
    clay: number;
    iron: number;
    population: number;
}
export interface soldier_costs {
    spearman: resource_costs,
    bowman: resource_costs,
    swordman: resource_costs,
    axeman: resource_costs,
    knight: resource_costs,
    catapult: resource_costs
}

export const soldier_costs: soldier_costs = {
    spearman: {
        gold: 70,
        wood: 25,
        clay: 0,
        iron: 0,
        population: 1,
    },
    bowman: {
        gold: 40,
        wood: 0,
        clay: 30,
        iron: 0,
        population: 2,
    },
    swordman: {
        gold: 90,
        wood: 0,
        clay: 90,
        iron: 90,
        population: 1,
    },
    axeman: {
        gold: 20,
        wood: 20,
        clay: 0,
        iron: 0,
        population: 3,
    },
    knight: {
        gold: 190,
        wood: 0,
        clay: 0,
        iron: 60,
        population: 4,
    },
    catapult: {
        gold: 130,
        wood: 0,
        clay: 40,
        iron: 0,
        population: 5,
    },
};