// screens/WarScreen.tsx

import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { DataContext } from '../../context/DataContext';
import HeaderMenuContent from '../../components/HeaderMenu/HeaderMenuContent';
import ContentView from '../../components/ContentView/ContentView';
import { calculateBotAttackPower, calculateBotDefencePower, calculatePlayerAttackPower, calculatePlayerDefencePower } from '../../service/CalculatePlayerPower';
import { useNavigation } from '@react-navigation/native';

const WarScreen = () => {
    const { data, dataBots, setData, setDataBots } = useContext(DataContext);
    const navigation: any = useNavigation();

    const aliveBots = dataBots.filter((bot: any) => bot.isAlive);

    const renderBot = ({ item }: any) => {
        return (
            <View style={styles.card}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.name}>{item.countryName}</Text>
                        <Text style={styles.info}>Pop: {item.population}</Text>
                        <Text style={styles.info}>Attack Power: {calculateBotAttackPower(item)}</Text>
                        <Text style={styles.info}>Defence Power: {calculateBotDefencePower(item)}</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                navigation.navigate('WarDetail', {
                                    id: item.id,
                                    defenderPower: calculateBotDefencePower(item)
                                });
                            }}
                        >
                            <Text style={styles.buttonText}>Attack</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        );
    };

    return (
        <ContentView>
            <HeaderMenuContent title={"War"} />
            <FlatList
                ListHeaderComponent={
                    <View style={styles.card}>
                        <Text style={styles.name}>Your Attack Power: {calculatePlayerAttackPower(data)}</Text>
                        <Text style={styles.name}>Your Defence Power: {calculatePlayerDefencePower(data)}</Text>
                    </View>
                }
                data={aliveBots}
                keyExtractor={(item) => item.countryName}
                renderItem={renderBot}
                contentContainerStyle={{ paddingBottom: 24 }}
            />
        </ContentView >
    );
};

export default WarScreen;

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#f8f8fa',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2a2a2a',
        marginBottom: 4,
    },
    info: {
        fontSize: 15,
        color: '#444',
        marginBottom: 2,
    },
    button: {
        marginTop: 12,
        backgroundColor: '#c33',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 48,
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
    },
});
