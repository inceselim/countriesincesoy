import { Alert } from 'react-native';
import { soldier_power } from '../data/soldier_powers';
import { calculateBotAttackPower, calculateBotDefencePower } from './CalculatePlayerPower';

const calculateUnitLoss = (player: any, lossPower: number): any => {
    const lostUnits: any = {};
    const unitOrder = ['spearman', 'bowman', 'swordman', 'axeman', 'knight', 'catapult'];

    for (let unit of unitOrder) {
        const unitPower = soldier_power[unit]?.defence || 1; // SAVUNMAYA GÖRE KAYIP HESABI
        const unitCount = player[unit] || 0;

        const maxLossPower = unitCount * unitPower;

        if (lossPower >= maxLossPower) {
            lostUnits[unit] = unitCount;
            lossPower -= maxLossPower;
        } else {
            const lostCount = Math.floor(lossPower / unitPower);
            lostUnits[unit] = lostCount;
            break;
        }
    }

    return lostUnits;
};

export const botAttacksPlayerRandomly = (
    bot: any,
    player: any,
    setPlayer: (data: any) => void
) => {
    if (!bot.isAlive || !player.isAlive) return;

    const chance = Math.random();
    if (chance > 0.05) return; // %5 şansla saldır

    const attackerPower = calculateBotAttackPower(bot);
    const defenderPower = calculateBotDefencePower(player);

    const lossRate = Math.random() * 0.2 + 0.1;
    const lostPop = Math.round(player.population * lossRate);
    const lostGold = Math.round(player.gold * lossRate);

    // Ortak: hangi askerler kaybedilecek
    const lossReferencePower = attackerPower > defenderPower ? defenderPower : attackerPower;
    const lostUnits = calculateUnitLoss(player, lossReferencePower);

    // Oyuncu güncellemesi
    const updatedPlayer = { ...player };

    // Nüfus ve altın düşüşü sadece kaybedilirse
    if (attackerPower > defenderPower) {
        updatedPlayer.population = player.population - lostPop;
        updatedPlayer.gold = player.gold - lostGold;
        updatedPlayer.isAlive = false;
    }

    // Asker kayıplarını uygula
    Object.keys(lostUnits).forEach((unit) => {
        updatedPlayer[unit] = Math.max(0, player[unit] - (lostUnits[unit] || 0));
    });

    setPlayer(updatedPlayer);

    if (attackerPower > defenderPower) {
        Alert.alert(
            'Düşman Saldırısı!',
            `Bir bot ülkenize saldırdı ve kazandı!\nKaybedilen nüfus: ${lostPop}\nKaybedilen altın: ${lostGold}\nAsker kayıpları: ${Object.entries(lostUnits).map(([u, v]) => `${u}: ${v}`).join(', ')}`
        );
    } else {
        Alert.alert(
            'Saldırı Başarısız',
            `Bir bot ülkenize saldırdı ama savunmayı kazandınız!\nAsker kayıpları: ${Object.entries(lostUnits).map(([u, v]) => `${u}: ${v}`).join(', ')}`
        );
    }
};
