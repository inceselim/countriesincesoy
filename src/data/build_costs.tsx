export interface build_types {
    parliament: string,
    barracks: string,
    castle: string,
    tower: string,
    espionage: string,
    blacksmith: string,
    farm: string,
    woodcutter: string,
    brickhouse: string,
    mine: string,
    trade_center: string,
}
export interface resource_costs {
    gold: number;
    wood: number;
    clay: number;
    iron: number;
    gems: number;
}

export interface build_costs {
    parliament: resource_costs;
    barracks: resource_costs;
    castle: resource_costs;
    tower: resource_costs;
    espionage: resource_costs;
    blacksmith: resource_costs;
    farm: resource_costs;
    woodcutter: resource_costs;
    brickhouse: resource_costs;
    mine: resource_costs;
    trade_center: resource_costs;
    avm: resource_costs;
}

export const build_costs: build_costs = {
    parliament: { gold: 200, wood: 20, clay: 25, iron: 15, gems: 0 },
    barracks: { gold: 100, wood: 10, clay: 15, iron: 35, gems: 0 },
    castle: { gold: 2000, wood: 130, clay: 185, iron: 155, gems: 0 },
    tower: { gold: 1300, wood: 220, clay: 125, iron: 115, gems: 0 },
    espionage: { gold: 0, wood: 0, clay: 0, iron: 0, gems: 5 },
    blacksmith: { gold: 500, wood: 320, clay: 325, iron: 515, gems: 0 },
    farm: { gold: 100, wood: 40, clay: 45, iron: 0, gems: 0 },
    woodcutter: { gold: 500, wood: 0, clay: 25, iron: 15, gems: 0 },
    brickhouse: { gold: 500, wood: 30, clay: 0, iron: 25, gems: 0 },
    mine: { gold: 750, wood: 60, clay: 55, iron: 0, gems: 0 },
    trade_center: { gold: 1150, wood: 80, clay: 65, iron: 75, gems: 0 },
    avm: { gold: 0, wood: 0, clay: 0, iron: 0, gems: 1 }
};