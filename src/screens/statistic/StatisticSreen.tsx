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

export const StatisticScreen = () => {
    const navigation: any = useNavigation();
    const [segment, setSegment] = useState(0)
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
    // G1()

    return (
        <ContentView>
            <HeaderMenuContent title={"Statistic"} />
            <ScrollView style={{
                paddingHorizontal: "2%",
            }}>
                <CardView>
                    <View style={{
                        flexDirection: "row",
                        paddingBottom: 10,
                    }}>
                        <View style={{ paddingHorizontal: 12, flex: 0.3 }}>
                            <Pressable onPress={() => setSegment(0)}
                                style={{
                                    backgroundColor: colors.kavunKoyu,
                                    borderRadius: 8,
                                    width: 145,
                                    alignItems: "center",
                                    paddingHorizontal: 12,
                                    marginVertical: 6,
                                    paddingVertical: 6,
                                    opacity: segment == 0 ? 0.52 : 1
                                }}>
                                <Text style={[styles.txtDarkBold]}>Defence Power</Text>
                            </Pressable>
                            <Pressable onPress={() => setSegment(1)}
                                style={{
                                    backgroundColor: colors.kavunKoyu,
                                    borderRadius: 8,
                                    width: 145,
                                    alignItems: "center",
                                    paddingHorizontal: 12,
                                    marginVertical: 6,
                                    paddingVertical: 6,
                                    opacity: segment == 1 ? 0.52 : 1
                                }}>
                                <Text style={[styles.txtDarkBold]}>Attack Power</Text>
                            </Pressable>
                            <Pressable onPress={() => setSegment(2)}
                                style={{
                                    backgroundColor: colors.kavunKoyu,
                                    borderRadius: 8,
                                    width: 145,
                                    alignItems: "center",
                                    paddingHorizontal: 12,
                                    marginVertical: 6,
                                    paddingVertical: 6,
                                    opacity: segment == 2 ? 0.52 : 1
                                }}>
                                <Text style={[styles.txtDarkBold]}>Population</Text>
                            </Pressable>
                        </View>

                        <View style={{ paddingStart: 12, flex: 0.7 }}>
                            <Text style={[styles.txtDarkTitle, { paddingStart: 0, }]}>{segment == 0 ? "Defence Power" : segment == 1 ? "Attack Power" : "Population"}</Text>
                            <Text style={[styles.txtDark, { paddingStart: 0, }]}>{segment == 0 ? "Defence Power" : segment == 1 ? "Attack Power" : "Population"}</Text>
                        </View>
                    </View>
                </CardView>
            </ScrollView>
        </ContentView >
    );
};