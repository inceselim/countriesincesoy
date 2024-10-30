//import liraries
import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { DataContext } from '../../context/DataContext';
import { formatShowNumber } from '../../utils/FormatShowNumbers';

// create a component
export const HeaderMenu = () => {
    const { data, setData,
        buildIncomeWood,
        buildIncomeClay,
        buildIncomeIron,
        buildMaintenanceGold,
        buildMaintenanceWood,
        buildMaintenanceClay,
        buildMaintenanceIron,
        armyMaintenanceGold,
        armyMaintenanceWood,
        armyMaintenanceClay,
        armyMaintenanceIron,
     } = useContext(DataContext)
    return (
        <View style={{
            backgroundColor: colors.bg,
            height: 50,
        }}>
            <SafeAreaView style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: "0%",
                paddingHorizontal: "1%",
                backgroundColor: colors.bg,
                borderBottomColor: colors.txtWhite,
                borderBottomWidth: 1,
                marginBottom: 6,
                height: 50,
                alignItems: "center"
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Text style={styles.txtBold}>📌 Turn {data.turn}</Text>
                    <Text style={[styles.txtBold, { paddingStart: 12 }]}>🫂 {formatShowNumber(data.farm * 1000) + "/" + formatShowNumber(data.population)} {"("}{ data.population - data.prevPopulation + ")"}</Text>
                    <Text style={[styles.txtBold, { paddingStart: 12 }]}>🪵 {data.wood} {"(" + Math.round(buildIncomeWood - (buildMaintenanceWood + armyMaintenanceWood)) + ")"}</Text>
                    <Text style={[styles.txtBold, { paddingStart: 12 }]}>🧱 {data.clay} {"(" + Math.round(buildIncomeClay - (buildMaintenanceClay + armyMaintenanceClay)) + ")"}</Text>
                    <Text style={[styles.txtBold, { paddingStart: 12 }]}>🪨 {data.iron} {"(" + Math.round(buildIncomeIron - (buildMaintenanceIron + armyMaintenanceIron)) + ")"}</Text>
                    {/* <Text style={styles.txtBold}>📌 Turn {data.turn}</Text>
                    <Text style={[styles.txtBold, { paddingStart: 12 }]}>🫂 {formatShowNumber(data.farm * 1000) + "/" + formatShowNumber(data.population)} {"("}{ data.population - data.prevPopulation + ")"}</Text>
                    <Text style={[styles.txtBold, { paddingStart: 12 }]}>🪵 {data.wood} {"(" + Math.round(buildIncomeWood - (buildMaintenanceWood + armyMaintenanceWood)) + ")"}</Text>
                    <Text style={[styles.txtBold, { paddingStart: 12 }]}>🧱 {data.clay} {"(" + Math.round(buildIncomeClay - (buildMaintenanceClay + armyMaintenanceClay)) + ")"}</Text>
                    <Text style={[styles.txtBold, { paddingStart: 12 }]}>🪨 {data.iron} {"(" + Math.round(buildIncomeIron - (buildMaintenanceIron + armyMaintenanceIron)) + ")"}</Text> */}
                </View>
                {/* <View style={{
                    flexDirection: "row"
                }}>
                    <Text style={styles.txtBold}>•👑{data.countryName}•</Text>
                </View> */}
                <View style={{
                    flexDirection: "row"
                }}>
                    <Text style={[styles.txtBold, { paddingEnd: 12, }]}>💎 {data.gems}</Text>
                    <Text style={styles.txtBold}>💰 {data.gold} ({data.income})</Text>
                </View>
            </SafeAreaView>
        </View>
    );
};