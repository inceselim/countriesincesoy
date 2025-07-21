// BotBuildDecision.tsx
// Botun hangi binayı kuracağına karar verir

import { build_costs } from '../data/build_costs';

export function botBuildDecision(botData: any): string | null {
    // Nüfus kapasitesi kontrolü: 1 farm = 1000 pop kapasitesi
    const farmCapacity = (botData.farm || 0) * 1000;
    if (botData.population >= farmCapacity) {
        // Kaynaklar yeterliyse farm kur
        const cost = build_costs.farm;
        if (
            botData.gold >= cost.gold &&
            botData.wood >= cost.wood &&
            botData.clay >= cost.clay &&
            botData.iron >= cost.iron &&
            botData.gems >= cost.gems
        ) {
            return 'farm';
        }
    }
    // Diğer binalar için en az olanı kurmaya çalış
    const buildings = [
        'parliament', 'castle', 'tower', 'espionage', 'barracks',
        'farm', 'mine', 'woodcutter', 'brickhouse', 'trade_center', 'avm'
    ];
    let minBuilding = buildings[0];
    let minValue = botData[minBuilding] || 0;
    for (const b of buildings) {
        if ((botData[b] || 0) < minValue) {
            minBuilding = b;
            minValue = botData[b] || 0;
        }
    }
    // Kaynak yeterliyse bina kur
    const cost = build_costs[minBuilding as keyof typeof build_costs];
    if (
        botData.gold >= cost.gold &&
        botData.wood >= cost.wood &&
        botData.clay >= cost.clay &&
        botData.iron >= cost.iron &&
        botData.gems >= cost.gems
    ) {
        return minBuilding;
    }
    return null;
}
