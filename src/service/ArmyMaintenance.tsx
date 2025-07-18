import { soldier_maintenance } from "../data/soldier_maintenance";

export const ArmyMaintenanceGold = (data: any) => {
    return Math.round(
        (data.spearman * soldier_maintenance.spearman.gold) +
        (data.bowman * soldier_maintenance.bowman.gold) +
        (data.swordman * soldier_maintenance.swordman.gold) +
        (data.axeman * soldier_maintenance.axeman.gold) +
        (data.knight * soldier_maintenance.knight.gold) +
        (data.catapult * soldier_maintenance.catapult.gold)
    );
};
export const ArmyMaintenanceWood = (data: any) => {
    return Math.round(
        (data.spearman * soldier_maintenance.spearman.wood) +
        (data.bowman * soldier_maintenance.bowman.wood) +
        (data.swordman * soldier_maintenance.swordman.wood) +
        (data.axeman * soldier_maintenance.axeman.wood) +
        (data.knight * soldier_maintenance.knight.wood) +
        (data.catapult * soldier_maintenance.catapult.wood)
    );
};
export const ArmyMaintenanceClay = (data: any) => {
    return Math.round(
        (data.spearman * soldier_maintenance.spearman.clay) +
        (data.bowman * soldier_maintenance.bowman.clay) +
        (data.swordman * soldier_maintenance.swordman.clay) +
        (data.axeman * soldier_maintenance.axeman.clay) +
        (data.knight * soldier_maintenance.knight.clay) +
        (data.catapult * soldier_maintenance.catapult.clay)
    );
};
export const ArmyMaintenanceIron = (data: any) => {
    return Math.round(
        (data.spearman * soldier_maintenance.spearman.iron) +
        (data.bowman * soldier_maintenance.bowman.iron) +
        (data.swordman * soldier_maintenance.swordman.iron) +
        (data.axeman * soldier_maintenance.axeman.iron) +
        (data.knight * soldier_maintenance.knight.iron) +
        (data.catapult * soldier_maintenance.catapult.iron)
    );
};