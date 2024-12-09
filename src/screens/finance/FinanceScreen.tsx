import React, { Component, useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, Pressable, Alert } from 'react-native';
import { styles } from '../../styles/styles';
import ContentView from '../../components/ContentView/ContentView';
import { useNavigation } from '@react-navigation/native';
import ButtonClose from '../../components/ButtonClose/ButtonClose';
import { colors } from '../../styles/colors';
import { DataContext } from '../../context/DataContext';
import ButtonSelect from '../../components/ButtonSelect/ButtonSelect';
import { BarracksUpdate } from '../../utils/BarracksUpdate';
import CardView from '../../components/CardView/CardView';
import { RecruitSoldier } from '../../utils/RecruitSoldier';
import { soldier_power } from '../../data/soldier_powers';
import { soldier_costs } from '../../data/soldier_costs';
import { soldier_maintenance } from '../../data/soldier_maintenance';
import { build_costs } from '../../data/build_costs';
import { calculateSoldierAmount } from '../../utils/CalculateSoldierAmount';
import { build_maintenance } from '../../data/build_maintenance';
import { BuildUpdate } from '../../utils/BuildUpdate';
import { build_defence_powers } from '../../data/build_defence_powers';
import HeaderMenuContent from '../../components/HeaderMenu/HeaderMenuContent';
import G1 from '../../ads/G1';

export const FinanceScreen = () => {
    const navigation: any = useNavigation();
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
    // REKLAM
    G1()
    return (
        <ContentView>
            <HeaderMenuContent title={"Finance"} />
            <ScrollView style={{
                paddingHorizontal: "2%",
            }}>
                <CardView>
                    <View style={{
                        flexDirection: "row",
                        paddingBottom: 10,
                    }}>
                        <View style={{ paddingHorizontal: 12, flex: 0.5 }}>
                            <Text style={[styles.txtDarkTitle, { paddingStart: 12, }]}>Income</Text>
                            <Text style={[styles.txtDarkBold, { paddingStart: 12, paddingBottom: 8, }]}>💰 {data.income}</Text>
                            <Text style={[styles.txtDarkBold, { paddingStart: 12, paddingBottom: 8, }]}>🪵 {Math.round(buildIncomeWood)}</Text>
                            <Text style={[styles.txtDarkBold, { paddingStart: 12, paddingBottom: 8, }]}>🧱 {Math.round(buildIncomeClay)}</Text>
                            <Text style={[styles.txtDarkBold, { paddingStart: 12, paddingBottom: 8, }]}>🪨 {Math.round(buildIncomeIron)}</Text>
                        </View>

                        <View style={{ paddingStart: 12, flex: 0.5 }}>
                            <Text style={[styles.txtDarkTitle, { paddingStart: 0, }]}>Maintenance</Text>
                            <Text style={[styles.txtDarkBold, { paddingStart: 12, paddingBottom: 8, }]}>💰 {buildMaintenanceGold + armyMaintenanceGold}</Text>
                            <Text style={[styles.txtDarkBold, { paddingStart: 12, paddingBottom: 8, }]}>🪵 {Math.round(buildMaintenanceWood + armyMaintenanceWood)}</Text>
                            <Text style={[styles.txtDarkBold, { paddingStart: 12, paddingBottom: 8, }]}>🧱 {Math.round(buildMaintenanceClay + armyMaintenanceClay)}</Text>
                            <Text style={[styles.txtDarkBold, { paddingStart: 12, paddingBottom: 8, }]}>🪨 {Math.round(buildMaintenanceIron + armyMaintenanceIron)}</Text>
                        </View>
                    </View>
                </CardView>
            </ScrollView>
        </ContentView >
    );
};