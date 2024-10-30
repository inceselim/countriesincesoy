
interface build_maintenance {
    defence: number;
    defence_bonus: number
}

interface build_maintenances {
    castle: build_maintenance;
    tower: build_maintenance;
}
export const build_defence_powers: build_maintenances = {
    castle: {
        defence: 500,
        defence_bonus: 0.01
    },
    tower: {
        defence: 300,
        defence_bonus: 0
    }
};
