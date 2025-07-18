import { build_maintenance } from "../data/build_maintenance";

export const BuildMaintenanceGold = (data: any) => {
    return Math.round(
        (data.parliament * build_maintenance.parliament.gold) +
        (data.barracks * build_maintenance.barracks.gold) +
        (data.castle * build_maintenance.castle.gold) +
        (data.tower * build_maintenance.tower.gold) +
        (data.espionage * build_maintenance.espionage.gold) +
        (data.farm * build_maintenance.farm.gold)
    )
};

export const BuildMaintenanceWood = (data: any) => {
    return Math.round(
        (data.parliament * build_maintenance.parliament.wood) +
        (data.barracks * build_maintenance.barracks.wood) +
        (data.castle * build_maintenance.castle.wood) +
        (data.tower * build_maintenance.tower.wood) +
        (data.espionage * build_maintenance.espionage.wood) +
        (data.farm * build_maintenance.farm.wood)
    )
};

export const BuildMaintenanceClay = (data: any) => {
    return Math.round(
        (data.parliament * build_maintenance.parliament.clay) +
        (data.barracks * build_maintenance.barracks.clay) +
        (data.castle * build_maintenance.castle.clay) +
        (data.tower * build_maintenance.tower.clay) +
        (data.espionage * build_maintenance.espionage.clay) +
        (data.farm * build_maintenance.farm.clay)
    )
};

export const BuildMaintenanceIron = (data: any) => {
    return Math.round(
        (data.parliament * build_maintenance.parliament.iron) +
        (data.barracks * build_maintenance.barracks.iron) +
        (data.castle * build_maintenance.castle.iron) +
        (data.tower * build_maintenance.tower.iron) +
        (data.espionage * build_maintenance.espionage.iron) +
        (data.farm * build_maintenance.farm.iron)
    )
};