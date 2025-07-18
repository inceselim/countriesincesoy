export const CalculatePopPlayer = (data: any): number => {
    if (data.population >= data.farm * 1000) return data.farm * 1000;
    if (data.population < 2500) return 2500;

    const polityBonusMap: Record<string, number> = {
        Premium: 1,
        Democracy: 0,
        Dictator: 0.2,
        Theocracy: 0,
        Aristocracy: 0,
        Monarchy: -0.2
    };

    const polityBonus = polityBonusMap[data.polity] ?? 0;
    const focusBonus = data.countryFocus === "pop" ? 0.2 : data.countryFocus === "premium" ? 1 : 0;

    // Vergi çarpanı: %10 → 0.006, %90 → 0.001
    const taxRate = data.taxRate || 10;
    const taxGrowthFactor = 0.006 - ((taxRate - 10) / 80) * 0.005;

    const baseGrowth = data.population * taxGrowthFactor;
    const bonusGrowth = data.population * 0.004 * (focusBonus + polityBonus);

    return Math.ceil(data.population + baseGrowth + bonusGrowth);
};

export const CalculatePopBot = (data: any): number => {
    if (data.population >= data.farm * 1000) return data.farm * 1000;
    if (data.population < 2500) return 2500;

    const polityBonusMap: Record<string, number> = {
        Premium: 1,
        Democracy: 0,
        Dictator: 0.2,
        Theocracy: 0,
        Aristocracy: 0,
        Monarchy: -0.2
    };

    const polityBonus = polityBonusMap[data.polity] ?? 0;
    const focusBonus = data.countryFocus === "pop" ? 0.2 : data.countryFocus === "premium" ? 1 : 0;

    const taxRate = data.taxRate || 10;
    const taxGrowthFactor = 0.006 - ((taxRate - 10) / 80) * 0.005;

    const baseGrowth = data.population * taxGrowthFactor;
    const bonusGrowth = data.population * 0.004 * (focusBonus + polityBonus);

    return Math.ceil(data.population + baseGrowth + bonusGrowth);
};
