// screens/WarScreen.tsx

import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { DataContext } from '../../context/DataContext';
import { calculateDefensePower } from '../../service/battle';
import AttackModal from '../../components/AttackModal/AttackModal';
import HeaderMenuContent from '../../components/HeaderMenu/HeaderMenuContent';
import ContentView from '../../components/ContentView/ContentView';

const WarScreen = () => {
    const { data, dataBots, setData, setDataBots } = useContext(DataContext);
    const [selectedBot, setSelectedBot] = useState(null);
    const [showModal, setShowModal] = useState(false);
    console.log("dataBots:", dataBots);

    const aliveBots = dataBots.filter((bot: any) => bot.isAlive);

    const renderBot = ({ item }: any) => {
        const unitData = {
            spearman: item.spearman,
            bowman: item.bowman,
            swordman: item.swordman,
            axeman: item.axeman,
            knight: item.knight,
            catapult: item.catapult,
        };

        const defense = calculateDefensePower(unitData, {
            castle: item.castle || 0,
            tower: item.tower || 0,
        });

        return (
            <View style={styles.card}>
                <Text style={styles.name}>{item.countryName}</Text>
                <Text>Population: {item.population}</Text>
                <Text>Defense Power: {defense}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setSelectedBot(item);
                        setShowModal(true);
                    }}
                >
                    <Text style={styles.buttonText}>Saldır</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <ContentView>
            <HeaderMenuContent title={"War"} />
            <FlatList
                data={dataBots}
                keyExtractor={(item) => item.countryName}
                renderItem={renderBot}
            />

            <AttackModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                attacker={data}
                defender={selectedBot}
                setData={setData}
                setDataBots={setDataBots}
            />
        </ContentView>
    );
};

export default WarScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    card: { padding: 12, borderRadius: 10, backgroundColor: '#f2f2f2', marginBottom: 12 },
    name: { fontSize: 18, fontWeight: 'bold' },
    button: { marginTop: 10, backgroundColor: '#c33', padding: 10, borderRadius: 8 },
    buttonText: { color: '#fff', textAlign: 'center' },
});
