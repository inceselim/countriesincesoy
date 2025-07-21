// BotAttackDecision.tsx
// Botun saldırı yapıp yapmayacağına ve kime saldıracağına karar verir

export function botAttackDecision(botData: any, allPlayers: any[]): { targetIndex: number, units: any } | null {
    // Basit örnek: En zayıf oyuncuya saldır
    let minDef = Infinity;
    let targetIndex = -1;
    for (let i = 0; i < allPlayers.length; i++) {
        if (allPlayers[i].isAlive && allPlayers[i] !== botData) {
            const def = (allPlayers[i].castle || 0) + (allPlayers[i].tower || 0);
            if (def < minDef) {
                minDef = def;
                targetIndex = i;
            }
        }
    }
    if (targetIndex === -1) return null;
    // Basit saldırı: tüm askerlerin %30'u ile saldır
    const units: Record<string, number> = {};
    ['spearman', 'bowman', 'swordman', 'axeman', 'knight', 'catapult'].forEach(type => {
        units[type] = Math.floor((botData[type] || 0) * 0.3);
    });
    return { targetIndex, units };
}
