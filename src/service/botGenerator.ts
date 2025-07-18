// utils/botGenerator.ts
export const generateBots = (count: number): any[] => {
    const focuses = ["attack", "defence", "income", "pop", "premium"];
    const polityTypes = ["monarchy", "theocracy", "aristocracy", "democracy", "republic"];

    return Array.from({ length: count }, (_, i) => ({
        countryName: `Bot${i + 1}`,
        countryFocus: focuses[Math.floor(Math.random() * focuses.length)],
        polity: polityTypes[Math.floor(Math.random() * polityTypes.length)],
        population: 3900,
        prevPopulation: 0,
        isAlive: true,
        gems: 0,
        gold: 3000 + i * 100,
        prevInflation: 1,
        inflation: 1,
        income: 0,
        wood: 500,
        clay: 500,
        iron: 500,
        parliament: 4,
        castle: 1,
        tower: 0,
        espionage: 0,
        barracks: 1,
        farm: 3,
        mine: 2,
        woodcutter: 2,
        brickhouse: 2,
        trade_center: 6,
        avm: 1,
        spearman: 10,
        bowman: 0,
        swordman: 0,
        axeman: 0,
        knight: 0,
        catapult: 0,
    }));
};
