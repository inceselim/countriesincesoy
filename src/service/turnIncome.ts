// utils/turnIncome.ts

import {
    ArmyMaintenanceGold, ArmyMaintenanceWood, ArmyMaintenanceClay, ArmyMaintenanceIron
} from './ArmyMaintenance';
import {
    BuildMaintenanceGold, BuildMaintenanceWood, BuildMaintenanceClay, BuildMaintenanceIron
} from './BuildMaintenance';

export const calculateTurnIncome = (data: any) => {
    // --- 1. Bonus oranlarını belirle
    const countryFocus = data.countryFocus;
    const polity = data.polity;

    const focusBonusMap: Record<string, number> = {
        income: 0.1,
        premium: 1,
        attack: 0,
        defence: 0,
        pop: 0,
    };

    const polityBonusMap: Record<string, number> = {
        Monarchy: 0.1,
        Aristocracy: 0.1,
        Democracy: 0,
        Dictator: 0,
        Theocracy: 0,
        Premium: 1
    };

    const incomeBonus = (focusBonusMap[countryFocus] || 0) + (polityBonusMap[polity] || 0);

    // --- 2. Altın geliri → nüfus + vergiye göre
    const taxRate = data.taxRate || 10; // %10–90 arası
    const population = data.population || 1000;
    const rawGold = (population / 1000) * 30 * (taxRate / 100); // esas altın geliri
    const goldIncome = Math.round((rawGold + (data.avm * 80) + (data.trade_center * 20)) * (1 + incomeBonus));
    // --- 3. Temel üretim (binaya göre)
    let baseWood = ((data.woodcutter || 0) * 20) + ((data.avm || 0) * 80);
    let baseClay = ((data.brickhouse || 0) * 20) + ((data.avm || 0) * 80);
    let baseIron = ((data.mine || 0) * 20) + ((data.avm || 0) * 80);

    // --- 3. Bonuslu üretim
    const woodIncome = Math.round(baseWood);
    const clayIncome = Math.round(baseClay);
    const ironIncome = Math.round(baseIron);

    // --- 4. Bakım giderleri
    const goldMaintenance = BuildMaintenanceGold(data);
    const woodMaintenance = ArmyMaintenanceWood(data) + BuildMaintenanceWood(data);
    const clayMaintenance = ArmyMaintenanceClay(data) + BuildMaintenanceClay(data);
    const ironMaintenance = ArmyMaintenanceIron(data) + BuildMaintenanceIron(data);
    // --- 5. Net gelirler
    return {
        gold: Math.max(goldIncome - goldMaintenance, 0),
        wood: Math.max(woodIncome - woodMaintenance, 0),
        clay: Math.max(clayIncome - clayMaintenance, 0),
        iron: Math.max(ironIncome - ironMaintenance, 0),
    };
};
