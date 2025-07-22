// utils/botGenerator.ts
export const generateBots = (count: number, selectMode: any): any[] => {
    const focuses = ["attack", "defence", "income", "pop", "premium"];
    const polityTypes = ["monarchy", "theocracy", "aristocracy", "democracy", "republic"];
    const value = selectMode === "1" ? 1 :
        selectMode == "2" ? 1.2 :
            selectMode == "3" ? 2 : 4
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        countryName: `Bot${i + 1}`,
        countryFocus: focuses[Math.floor(Math.random() * focuses.length)],
        polity: polityTypes[Math.floor(Math.random() * polityTypes.length)],
        population: 3000,
        prevPopulation: 0,
        isAlive: true,
        gems: 0,
        gold: 1000 * value,
        prevInflation: 1,
        inflation: 1,
        income: 0,
        wood: 300 * value,
        clay: 300 * value,
        iron: 300 * value,
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
        avm: 2,
        spearman: 3,
        bowman: 3,
        swordman: 5,
        axeman: 5 * value,
        knight: 15 * value,
        catapult: 0,
    }));
};
