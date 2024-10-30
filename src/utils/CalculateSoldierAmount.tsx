import { soldier_maintenance } from "../data/soldier_maintenance";

export const calculateSoldierAmount = (data: any) => {
    return (data.spearman * soldier_maintenance.spearman.pop) +
        (data.bowman * soldier_maintenance.bowman.pop) +
        (data.swordman * soldier_maintenance.swordman.pop) +
        (data.axeman * soldier_maintenance.axeman.pop) +
        (data.knight * soldier_maintenance.knight.pop) +
        (data.catapult * soldier_maintenance.catapult.pop);
};