import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const unitIcons: Record<string, any> = {
    spearman: require('../../assets/armies/spearman512.png'),
    bowman: require('../../assets/armies/bowman512.png'),
    swordman: require('../../assets/armies/swordman512.png'),
    axeman: require('../../assets/armies/axeman512.png'),
    knight: require('../../assets/armies/knight512.png'),
    catapult: require('../../assets/armies/catapult512.png'),
};

const WarReportScreen = () => {
    const route: any = useRoute();
    const navigation = useNavigation();

    const { lostUnits, gainedPop, gainedGold, victory } = route.params;

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: victory ? '#e7ffe7' : '#ffe7e7' }]}>
            <Text style={[styles.title, { color: victory ? 'green' : 'red' }]}>
                {victory ? '🎉 Victory Report' : '💥 Defeat Report'}
            </Text>

            <Text style={styles.sectionTitle}>🪖 Lost Soldiers</Text>
            {Object.entries(lostUnits).map(([unit, count]) => (
                <View key={unit} style={styles.unitRow}>
                    <Image source={unitIcons[unit]} style={styles.icon} />
                    <Text style={styles.unitText}>{unit.toUpperCase()}:</Text>
                    <Text style={styles.unitCount}>– {count}</Text>
                </View>
            ))}

            {victory && (
                <>
                    <Text style={styles.sectionTitle}>🏆 Kazanımlar</Text>
                    <Text style={styles.gainText}>+ {gainedPop} 👥 nüfus</Text>
                    <Text style={styles.gainText}>+ {gainedGold} 💰 altın</Text>
                </>
            )}

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.buttonText}>Tamam</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default WarReportScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'flex-start',
        minHeight: '100%',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 8,
    },
    unitRow: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        width: 32,
        height: 32,
        marginRight: 10,
    },
    unitText: {
        fontSize: 16,
        width: 100,
    },
    unitCount: {
        fontSize: 16,
        color: '#c00',
    },
    gainText: {
        fontSize: 16,
        marginBottom: 6,
        color: 'green',
    },
    button: {
        backgroundColor: '#333',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 24,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
