// screens/WarDetailScreen.tsx

import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { useRoute, useNavigation } from '@react-navigation/native';
import { DataContext } from '../../context/DataContext';
import { calculatePlayerAttackPower } from '../../service/CalculatePlayerPower';
import { soldier_power } from '../../data/soldier_powers';

const unitTypes = ['spearman', 'bowman', 'swordman', 'axeman', 'knight', 'catapult'] as const;

const WarDetailScreen = () => {
    const { data, setData, dataBots, setDataBots } = useContext(DataContext);
    const navigation: any = useNavigation();
    const route: any = useRoute();
    const defender = route.params.id;
    const defenderPower = route.params.defenderPower;
    const defenderName = defender + 1;
    const defenderBot = dataBots.find((b: any) => b.id === defender);

    const [selectedUnits, setSelectedUnits] = useState<Record<string, number>>(
        Object.fromEntries(unitTypes.map((u) => [u, 0]))
    );
    // const calculateUnitLoss = (selectedUnits: any, lossPower: number): any => {
    //     const lostUnits: any = {};
    //     const unitOrder = ['spearman', 'bowman', 'swordman', 'axeman', 'knight', 'catapult'];

    //     for (let unit of unitOrder) {
    //         const unitPower = soldier_power[unit]?.attack || 1;
    //         const sentCount = selectedUnits[unit] || 0;

    //         const maxLossPower = sentCount * unitPower;

    //         if (lossPower >= maxLossPower) {
    //             lostUnits[unit] = sentCount;
    //             lossPower -= maxLossPower;
    //         } else {
    //             const lostCount = Math.floor(lossPower / unitPower);
    //             lostUnits[unit] = lostCount;
    //             break;
    //         }
    //     }

    //     return lostUnits;
    // };
    const calculateUnitLoss = (
        selectedUnits: any,
        lossPower: number,
        polity: string,
        countryFocus: string
    ): any => {
        const lostUnits: any = {};
        const unitOrder = ['spearman', 'bowman', 'swordman', 'axeman', 'knight', 'catapult'];

        // BONUS HESAPLAMA
        const polityBonus = polity === 'Monarchy' ? 0.2 : polity === 'Aristocracy' ? -0.2 : 0;
        const focusBonus = countryFocus === 'attack' ? 0.2 : countryFocus === 'premium' ? 1 : 0;
        const totalBonus = 1 + polityBonus + focusBonus;

        // BONUS GÜCÜ KADAR LOSS DÜŞÜLÜR
        const effectiveLoss = Math.round(lossPower / totalBonus);

        let remainingLoss = effectiveLoss;

        for (let unit of unitOrder) {
            const unitPower = soldier_power[unit]?.attack || 1;
            const sentCount = selectedUnits[unit] || 0;

            const maxLossPower = sentCount * unitPower;

            if (remainingLoss >= maxLossPower) {
                lostUnits[unit] = sentCount;
                remainingLoss -= maxLossPower;
            } else {
                const lostCount = Math.floor(remainingLoss / unitPower);
                lostUnits[unit] = lostCount;
                break;
            }
        }

        return lostUnits;
    };
    const reduceSelectedUnitsAfterBattle = (playerData: any, selectedUnits: any, lossPower: number) => {
        const updatedPlayer = { ...playerData };
        const unitOrder = ['spearman', 'bowman', 'swordman', 'axeman', 'knight', 'catapult'];

        for (let unit of unitOrder) {
            const unitPower = soldier_power[unit]?.attack || 1;
            const sentCount = selectedUnits[unit] || 0;

            const maxLossPower = sentCount * unitPower;

            if (lossPower >= maxLossPower) {
                // Gönderilen tüm birim kaybedilir
                updatedPlayer[unit] -= sentCount;
                lossPower -= maxLossPower;
            } else {
                // Kısmen kaybedilir
                const lostCount = Math.floor(lossPower / unitPower);
                updatedPlayer[unit] -= lostCount;
                break;
            }
        }

        return updatedPlayer;
    };

    const executeBattle = () => {
        // Burada savaş simülasyonu yapılabilir
        const lostUnits = calculateUnitLoss(selectedUnits, defenderPower); // Asker kaybı hesapla

        if (calculatePlayerAttackPower({
            ...selectedUnits,
            polity: data.polity,
            countryFocus: data.countryFocus
        }) > defenderPower) {
            const lossRate = Math.random() * 0.2 + 0.1; // %10–30
            const lostPop = Math.round(defenderBot.population * lossRate);
            const lostGold = Math.round(defenderBot.gold * lossRate);
            const newDefenderPop = defenderBot.population - lostPop;

            const updatedPlayer = reduceSelectedUnitsAfterBattle(data, selectedUnits, defenderPower);

            // Bot'u güncelle
            setDataBots((prevBots: any[]) =>
                prevBots.map((bot) =>
                    bot.id === defender
                        ? {
                            ...bot,
                            population: newDefenderPop,
                            gold: bot.gold - lostGold,
                            isAlive: false,
                        }
                        : bot
                )
            );

            // Oyuncu güncelle
            setData({
                ...updatedPlayer,
                gold: updatedPlayer.gold + lostGold,
                population: updatedPlayer.population + lostPop,
            });
            navigation.navigate('WarReport', {
                victory: true,
                gainedPop: lostPop,
                gainedGold: lostGold,
                lostUnits: lostUnits,
            });
        }
        else {
            // Oyuncunun gönderdiği askerlerden kayıp uygula
            const updatedPlayer = reduceSelectedUnitsAfterBattle(data, selectedUnits, defenderPower);

            // Oyuncuyu güncelle
            setData({
                ...updatedPlayer
            });

            navigation.navigate('WarReport', {
                victory: false,
                gainedPop: 0,
                gainedGold: 0,
                lostUnits: lostUnits,
            });
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Target: {"Bot" + defenderName} Power: {defenderPower}</Text>
                <Text style={styles.subtitle}>Choose Army</Text>
                <Text style={styles.subtitle}>Chose Army Power: {calculatePlayerAttackPower({
                    ...selectedUnits,
                    polity: data.polity,
                    countryFocus: data.countryFocus
                })}</Text>

                {unitTypes.map((unit) => (
                    <View key={unit} style={styles.unitRow}>
                        <Text style={styles.unitName}>{unit.toUpperCase()} ({data[unit] || 0})</Text>
                        <Slider
                            minimumValue={0}
                            maximumValue={data[unit] || 0}
                            step={1}
                            value={selectedUnits[unit]}
                            onValueChange={(value) =>
                                setSelectedUnits((prev) => ({ ...prev, [unit]: value }))
                            }
                            style={{ width: 150 }}
                        />
                        <Text>{selectedUnits[unit]}</Text>
                    </View>
                ))}

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.cancelText}>İptal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.attackButton} onPress={() => {
                        executeBattle();
                    }}>
                        <Text style={styles.attackText}>Saldır!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default WarDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    subtitle: { fontSize: 16, fontWeight: '600', marginVertical: 10 },
    unitRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
        justifyContent: 'space-between',
    },
    unitName: { width: 110 },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 24,
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    cancelText: { color: '#333', fontSize: 16 },

    attackButton: {
        backgroundColor: '#c00',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    attackText: { color: '#fff', fontSize: 16 },
});
