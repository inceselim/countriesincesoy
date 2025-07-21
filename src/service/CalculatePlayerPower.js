import { build_defence_powers } from "../data/build_defence_powers";
import { soldier_power } from "../data/soldier_powers";

export const calculatePlayerAttackPower = (playerData) => {
    let countryFocus = playerData.countryFocus === "attack" ? 0.2 : playerData.countryFocus === "premium" ? 1 : 0;
    let polityBonus = playerData.polity === "Monarchy" ? 0.2 : playerData.polity === "Aristocracy" ? -0.2 : 0;
    let totalPower = ((soldier_power.axeman.attack * playerData.axeman) +
        (soldier_power.spearman.attack * playerData.spearman) +
        (soldier_power.swordman.attack * playerData.swordman) +
        (soldier_power.bowman.attack * playerData.bowman) +
        (soldier_power.knight.attack * playerData.knight) +
        (soldier_power.catapult.attack * playerData.catapult));
    return Math.round(totalPower * (1 + countryFocus + polityBonus));
};

export const calculatePlayerDefencePower = (playerData) => {
    let countryFocus = playerData.countryFocus === "defence" ? 0.2 : playerData.countryFocus === "premium" ? 1 : 0;
    let polityBonus = playerData.polity === "Theocracy" ? 0.2 : playerData.polity === "Dictator" ? 0.1 : playerData.polity === "Democracy" ? -0.20 : 0;
    let totalPower = ((soldier_power.axeman.defence * playerData.axeman) +
        (soldier_power.spearman.defence * playerData.spearman) +
        (soldier_power.swordman.defence * playerData.swordman) +
        (soldier_power.bowman.defence * playerData.bowman) +
        (soldier_power.knight.defence * playerData.knight) +
        (soldier_power.catapult.defence * playerData.catapult) +
        (build_defence_powers.castle.defence * playerData.castle) +
        (build_defence_powers.tower.defence * playerData.tower)) * (1 + build_defence_powers.castle.defence_bonus * playerData.castle);
    return Math.round(totalPower * (1 + countryFocus + polityBonus));
};

export const calculateBotAttackPower = (botData) => {
    let countryFocus = botData.countryFocus === "attack" ? 0.2 : botData.countryFocus === "premium" ? 1 : 0;
    let polityBonus = botData.polity === "Monarchy" ? 0.2 : botData.polity === "Aristocracy" ? -0.2 : 0;
    let totalPower = ((soldier_power.axeman.attack * botData.axeman) +
        (soldier_power.spearman.attack * botData.spearman) +
        (soldier_power.swordman.attack * botData.swordman) +
        (soldier_power.bowman.attack * botData.bowman) +
        (soldier_power.knight.attack * botData.knight) +
        (soldier_power.catapult.attack * botData.catapult));
    return Math.round(totalPower * (1 + countryFocus + polityBonus));
};
export const calculateBotDefencePower = (botData) => {
    let countryFocus = botData.countryFocus === "defence" ? 0.2 : botData.countryFocus === "premium" ? 1 : 0;
    let polityBonus = botData.polity === "Theocracy" ? 0.2 : botData.polity === "Dictator" ? 0.1 : botData.polity === "Democracy" ? -0.20 : 0;
    let totalPower = ((soldier_power.axeman.defence * botData.axeman) +
        (soldier_power.spearman.defence * botData.spearman) +
        (soldier_power.swordman.defence * botData.swordman) +
        (soldier_power.bowman.defence * botData.bowman) +
        (soldier_power.knight.defence * botData.knight) +
        (soldier_power.catapult.defence * botData.catapult) +
        (build_defence_powers.castle.defence * botData.castle) +
        (build_defence_powers.tower.defence * botData.tower)) * (1 + build_defence_powers.castle.defence_bonus * botData.castle);
    return Math.round(totalPower * (1 + countryFocus + polityBonus));
};