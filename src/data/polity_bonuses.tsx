// Olumlu etkiler
export interface Effects {
    attack?: number;
    defence?: number;
    soldierMaintenance?: number;
    income?: number;
    population?: number;
    buildPrice?: number;
}

// Olumsuz etkiler
export interface NegativeEffects {
    attack?: number;
    defence?: number;
    soldierMaintenance?: number;
    population?: number;
    buildPrice?: number;
}

// Her yönetim biçimi için yapı
export interface Polity {
    turns?: number | null;  // "null" seçimsiz yönetim biçimlerinde kullanılır (örneğin diktatörlük)
    effects: Effects;       // Olumlu etkiler
    negative: NegativeEffects; // Olumsuz etkiler
}

// Polities nesnesinin genel yapısı
export interface Polities {
    monarchy: Polity;
    aristocracy: Polity;
    theocracy: Polity;
    dictatorship: Polity;
    democracy: Polity;
    premium: Polity;
}

// Yönetim biçimlerini içeren nesne
export const polities: Polities = {
    monarchy: {
        turns: 40,
        effects: {
            attack: 0.2,
            income: 0.2,
        },
        negative: {
            population: 0.2
        }
    },
    aristocracy: {
        turns: 20,
        effects: {
            income: 0.2,
            attack: 0.2
        },
        negative: {
            buildPrice: 0.2
        }
    },
    theocracy: {
        turns: 10,
        effects: {
            income: 0.2,
            defence: 0.2,
        },
        negative: {
            buildPrice: 0.2
        }
    },
    dictatorship: {
        turns: null,
        effects: {
            population: 0.2,
            defence: 0.2,
        },
        negative: {
            attack: 0.2
        }
    },
    democracy: {
        turns: 5,
        effects: {
            population: 0.2,
            buildPrice: 0.2,
        },
        negative: {
            defence: 0.1
        }
    },
    premium: {
        turns: 5,
        effects: {
            // population: "+50%",
            // attack: "+100%",
            // defence: "+100%"
            population: 1,
            attack: 1,
            defence: 1
        },
        negative: {}
    }
};
