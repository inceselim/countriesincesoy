
interface build_income {
    gold: number;
    iron: number;
    clay: number;
    wood: number;
}

interface build_incomes {
    mine: build_income;
    woodcutter: build_income;
    brickhouse: build_income;
    trade_center: build_income;
    avm: build_income;
}
export const build_income: build_incomes = {
    mine: {
        gold: 5,
        wood: 0,
        clay: 0,
        iron: 11,
    },
    woodcutter: {
        gold: 3,
        wood: 15,
        clay: 0,
        iron: 0,
    },
    brickhouse: {
        gold: 3,
        wood: 0,
        clay: 15,
        iron: 0,
    },
    trade_center: {
        gold: 20,
        wood: 0,
        clay: 0,
        iron: 0,
    },
    avm: {
        gold: 80,
        wood: 80,
        clay: 80,
        iron: 80,
    },
};
