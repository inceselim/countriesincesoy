// BotRecruitSoldier.tsx
// Botun hangi askeri ve ne kadar basacağına karar verir

export function botRecruitSoldier(botData: any): { type: string, amount: number } | null {
    // Basit örnek: En az olan askeri bas
    const soldiers = ['spearman', 'bowman', 'swordman', 'axeman', 'knight', 'catapult'];
    let minSoldier = soldiers[0];
    let minValue = botData[minSoldier] || 0;
    for (const s of soldiers) {
        if ((botData[s] || 0) < minValue) {
            minSoldier = s;
            minValue = botData[s] || 0;
        }
    }
    // Kaynak yeterliyse asker bas
    // (Kaynak kontrolü eklenebilir)
    return { type: minSoldier, amount: 5 };
}
