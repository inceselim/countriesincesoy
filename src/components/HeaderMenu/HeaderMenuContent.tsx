//import liraries
import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from '../../styles/styles';
import ButtonClose from '../ButtonClose/ButtonClose';
import { colors } from '../../styles/colors';
import { DataContext } from '../../context/DataContext';
import { build_income } from '../../data/build_income';
import { BuildMaintenanceClay, BuildMaintenanceGold, BuildMaintenanceIron, BuildMaintenanceWood } from '../../utils/BuildMaintenance';
import { ArmyMaintenanceGold, ArmyMaintenanceWood, ArmyMaintenanceClay, ArmyMaintenanceIron } from '../../utils/ArmyMaintenance';
import { formatShowNumber } from '../../utils/FormatShowNumbers';

// create a component
const HeaderMenuContent = ({ title }: any) => {
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
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: colors.white,
            marginBottom: 12,
            paddingBottom: 6
        }}>
            <Text style={[styles.txtDarkTitle, { marginStart: 12 }]}>{title}</Text>
            <View style={{
                flexDirection: "row"
            }}>
                <Text style={[styles.txtDarkBold, { paddingEnd: 12 }]}>🫂 {formatShowNumber(data.farm * 1000) + " / " + formatShowNumber(data.population)} {"("}{ data.population - data.prevPopulation + ")"}</Text>
                <Text style={[styles.txtDarkBold, { paddingEnd: 12 }]}>🪵 {data.wood} {"(" + Math.round(buildIncomeWood - (buildMaintenanceWood + armyMaintenanceWood)) + ")"}</Text>
                <Text style={[styles.txtDarkBold, { paddingEnd: 12 }]}>🧱 {data.clay} {"(" + Math.round(buildIncomeClay - (buildMaintenanceClay + armyMaintenanceClay)) + ")"}</Text>
                <Text style={[styles.txtDarkBold, { paddingEnd: 12 }]}>🪨 {data.iron} {"(" + Math.round(buildIncomeIron - (buildMaintenanceIron + armyMaintenanceIron)) + ")"}</Text>
                <Text style={[styles.txtDarkBold, { paddingEnd: 12, }]}>💎 {data.gems}</Text>
                <Text style={styles.txtDarkBold}>💰 {data.gold}</Text>
            </View>
            <ButtonClose />
        </View>
    );
};
export default HeaderMenuContent;
