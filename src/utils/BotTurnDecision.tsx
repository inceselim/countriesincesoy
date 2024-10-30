export const botTurnDecision = (bot: any, data: any, player: any, turn: number, bots: any[], setGameData: (data: any) => void) => {
    const { countryFocus, gold, wood, clay, iron, barracks, farm, population, prevPopulation } = bot;
    const decideBuilding = (bot: any) => {
        if (bot.population >= bot.populationCapacity) {
            return 'farm'; // Nüfus kapasitesi dolduysa çiftlik kur
        } else if (bot.barracksCapacity <= bot.spearman + bot.bowman + bot.swordman) {
            return 'barracks'; // Kışla doluysa yeni kışla kur
        } else if (bot.gold < 500 || bot.wood < 100 || bot.clay < 100 || bot.iron < 100) {
            // Kaynak yetersizse üretim binalarını kur
            if (bot.wood < 100) return 'woodcutter';
            if (bot.iron < 100) return 'mine';
            if (bot.clay < 100) return 'brickhouse';
        } else if (bot.parliamentCapacity <= bot.parliament) {
            return 'parliament'; // Parlamentonun kapasitesi dolmuşsa parlamento kur
        }
        return null; // Karar verilmezse null döner
    };
    decideBuilding(bot)

};
