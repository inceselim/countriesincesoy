import { build_defence_powers } from "../data/build_defence_powers";
import { soldier_power } from "../data/soldier_powers";

type UnitType = 'spearman' | 'bowman' | 'swordman' | 'axeman' | 'knight' | 'catapult';

const attackValues: Record<UnitType, number> = {
    spearman: soldier_power.spearman.attack,
    bowman: soldier_power.bowman.attack,
    swordman: soldier_power.swordman.attack,
    axeman: soldier_power.axeman.attack,
    knight: soldier_power.knight.attack,
    catapult: soldier_power.catapult.attack,
};

const defenseValues: Record<UnitType, number> = {
    spearman: soldier_power.spearman.defence,
    bowman: soldier_power.bowman.defence,
    swordman: soldier_power.swordman.defence,
    axeman: soldier_power.axeman.defence,
    knight: soldier_power.knight.defence,
    catapult: soldier_power.catapult.defence,
};

// ✅ Saldırı gücü hesaplama
export const calculateAttackPower = (units: Record<UnitType, number>) => {
    return Object.entries(units).reduce((total, [unit, count]) => {
        return total + (attackValues[unit as UnitType] * (count || 0));
    }, 0);
};

// ✅ Savunma gücü hesaplama (yapı bonuslu)
export const calculateDefensePower = (
    units: Record<UnitType, number>,
    structureBonus: { castle: number, tower: number }
) => {
    const unitPower = Object.entries(units).reduce((total, [unit, count]) => {
        return total + (defenseValues[unit as UnitType] * (count || 0));
    }, 0);

    const structurePower = (structureBonus.castle || 0) * 20 + (structureBonus.tower || 0) * 10;

    return (unitPower + structurePower);
};

// ✅ Savaş işleyişi
export const executeBattle = (
    attackerData: any,
    defenderData: any,
    attackingUnits: Record<UnitType, number>
): {
    updatedAttacker: any, updatedDefender: any, winner: 'attacker' | 'defender',
    report: {
        lostPop: number;
        lostGold: number;
        attackerGained: boolean;
        eliminated: boolean;
    }
} => {
    const attackerPower = calculateAttackPower(attackingUnits);

    const defenderUnits: Record<UnitType, number> = {
        spearman: defenderData.spearman,
        bowman: defenderData.bowman,
        swordman: defenderData.swordman,
        axeman: defenderData.axeman,
        knight: defenderData.knight,
        catapult: defenderData.catapult,
    };

    const defenderPower = calculateDefensePower(defenderUnits, {
        castle: build_defence_powers.castle.defence || 0,
        tower: build_defence_powers.tower.defence || 0,
    });

    const winner = attackerPower > defenderPower ? 'attacker' : 'defender';

    const lossPercent = Math.floor(Math.random() * 21) + 10; // 10–30%

    let updatedAttacker = { ...attackerData };
    let updatedDefender = { ...defenderData };

    if (winner === 'attacker') {
        // Kazanan: saldıran → savunan silinir
        const lostPop = Math.floor(defenderData.population * (lossPercent / 100));
        const lostGold = Math.floor(defenderData.gold * (lossPercent / 100));

        updatedDefender.population -= lostPop;
        updatedDefender.gold -= lostGold;
        updatedAttacker.population += lostPop;
        updatedAttacker.gold += lostGold;

        updatedDefender.isAlive = false; // Savunan silinir
    }

    // Gönderilen askerleri düşür (saldıran)
    Object.keys(attackingUnits).forEach((unit) => {
        const u = unit as UnitType;
        updatedAttacker[u] = Math.max(0, (attackerData[u] || 0) - (attackingUnits[u] || 0));
    });

    return {
        updatedAttacker,
        updatedDefender,
        winner,
        report: {
            lostPop: Math.floor(defenderData.population * (lossPercent / 100)),
            lostGold: Math.floor(defenderData.gold * (lossPercent / 100)),
            attackerGained: winner === 'attacker',
            eliminated: !updatedDefender.isAlive,
        }
    };
};
