import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { executeBattle } from '../../service/battle';

const unitTypes = ['spearman', 'bowman', 'swordman', 'axeman', 'knight', 'catapult'] as const;

const AttackModal = ({ visible, onClose, attacker, defender, setData, setDataBots }: any) => {
    const [selectedUnits, setSelectedUnits] = useState<Record<string, number>>(
        Object.fromEntries(unitTypes.map((u) => [u, 0]))
    );

    const handleAttack = () => {
        const { updatedAttacker, updatedDefender } = executeBattle(attacker, defender, selectedUnits);

        // Oyuncuyu güncelle
        setData(updatedAttacker);

        // Botu güncelle
        setDataBots((prev: any[]) =>
            prev.map((bot) => (bot.name === updatedDefender.name ? updatedDefender : bot))
        );

        // Modal kapansın
        setSelectedUnits(Object.fromEntries(unitTypes.map((u) => [u, 0])));
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.content}>
                    <Text style={styles.title}>Birlik Seç</Text>
                    <ScrollView style={{ maxHeight: 350 }}>
                        {unitTypes.map((unit) => (
                            <View key={unit} style={styles.unitRow}>
                                <Text style={styles.unitName}>
                                    {unit.toUpperCase()} ({attacker[unit]})
                                </Text>
                                <Slider
                                    minimumValue={0}
                                    maximumValue={attacker[unit] || 0}
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
                    </ScrollView>

                    <TouchableOpacity style={styles.attackBtn} onPress={handleAttack}>
                        <Text style={styles.attackText}>Saldır!</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                        <Text style={styles.cancelText}>İptal</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AttackModal;

const styles = StyleSheet.create({
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0009' },
    content: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    unitRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8 },
    unitName: { width: 100 },
    attackBtn: { backgroundColor: '#c00', padding: 12, borderRadius: 8, marginTop: 16 },
    attackText: { color: '#fff', textAlign: 'center' },
    cancelBtn: { padding: 10 },
    cancelText: { textAlign: 'center', color: '#333' },
});
