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

export const MarketScreen = () => {
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

    const sellMaterial = ({ item, state }: any) => {
        // state 0 sıfır ise satış demektir.
        // state 1 bir ise maden (wood, clay, iron) alış demektir.
        if (state == 0) {
            switch (item) {
                case "wood":
                    setData((prevData: any) => ({
                        ...prevData,
                        gold: prevData.gold + 70,
                        wood: prevData.wood - 100,
                    }))
                    break;
                case "clay":
                    setData((prevData: any) => ({
                        ...prevData,
                        gold: prevData.gold + 70,
                        clay: prevData.clay - 100
                    }))
                    break;
                case "iron":
                    setData((prevData: any) => ({
                        ...prevData,
                        gold: prevData.gold + 90,
                        iron: prevData.iron - 100
                    }))
                    break;
                default:
                    break;
            }
        }
        else {
            switch (item) {
                case "wood":
                    setData((prevData: any) => ({
                        ...prevData,
                        gold: prevData.gold - 70,
                        wood: prevData.wood + 70,
                    }))
                    break;
                case "clay":
                    setData((prevData: any) => ({
                        ...prevData,
                        gold: prevData.gold - 70,
                        clay: prevData.clay + 70
                    }))
                    break;
                case "iron":
                    setData((prevData: any) => ({
                        ...prevData,
                        gold: prevData.gold - 90,
                        iron: prevData.iron + 70
                    }))
                    break;
                default:
                    break;
            }
        }
    }
    return (
        <ContentView>
            <HeaderMenuContent title={"Market"} />
            <ScrollView style={{
                paddingHorizontal: "2%",
            }}>
                <CardView>
                    <View style={{
                        flexDirection: "row",
                        paddingBottom: 10,
                    }}>
                        <View style={{ paddingHorizontal: 12, flex: 0.5 }}>
                            <Text style={[styles.txtDarkTitle, { paddingStart: 12, }]}>Sell</Text>
                            <Pressable onPress={() => sellMaterial({ item: "wood", state: 0 })}
                                style={{
                                    backgroundColor: colors.kavunKoyu,
                                    borderRadius: 8,
                                    width: 120,
                                    alignItems: "center",
                                    paddingHorizontal: 6,
                                    marginVertical: 6,
                                    paddingVertical: 6,
                                    // opacity: disabled ? 0.52 : 1
                                }}>
                                <Text style={[styles.txtDarkBold]}>100🪵 - 70💰</Text>
                            </Pressable>
                            <Pressable onPress={() => sellMaterial({ item: "clay", state: 0 })}
                                style={{
                                    backgroundColor: colors.kavunKoyu,
                                    borderRadius: 8,
                                    width: 120,
                                    alignItems: "center",
                                    paddingHorizontal: 6,
                                    marginVertical: 6,
                                    paddingVertical: 6,
                                    // opacity: disabled ? 0.52 : 1
                                }}>
                                <Text style={[styles.txtDarkBold]}>100🧱 - 70💰</Text>
                            </Pressable>
                            <Pressable onPress={() => sellMaterial({ item: "iron", state: 0 })}
                                style={{
                                    backgroundColor: colors.kavunKoyu,
                                    borderRadius: 8,
                                    width: 120,
                                    alignItems: "center",
                                    paddingHorizontal: 6,
                                    marginVertical: 6,
                                    paddingVertical: 6,
                                    // opacity: disabled ? 0.52 : 1
                                }}>
                                <Text style={[styles.txtDarkBold]}>100🪨 - 90💰</Text>
                            </Pressable>
                        </View>

                        <View style={{ paddingStart: 12, flex: 0.5 }}>
                            <Text style={[styles.txtDarkTitle, { paddingStart: 0, }]}>Buy</Text>
                            <Pressable onPress={() => sellMaterial({ item: "wood", state: 1 })}
                                style={{
                                    backgroundColor: colors.kavunKoyu,
                                    borderRadius: 8,
                                    width: 120,
                                    alignItems: "center",
                                    paddingHorizontal: 6,
                                    marginVertical: 6,
                                    paddingVertical: 6,
                                    // opacity: disabled ? 0.52 : 1
                                }}>
                                <Text style={[styles.txtDarkBold]}>70💰 - 70🪵</Text>
                            </Pressable>
                            <Pressable onPress={() => sellMaterial({ item: "clay", state: 1 })}
                                style={{
                                    backgroundColor: colors.kavunKoyu,
                                    borderRadius: 8,
                                    width: 120,
                                    alignItems: "center",
                                    paddingHorizontal: 6,
                                    marginVertical: 6,
                                    paddingVertical: 6,
                                    // opacity: disabled ? 0.52 : 1
                                }}>
                                <Text style={[styles.txtDarkBold]}>70💰 - 70🧱</Text>
                            </Pressable>
                            <Pressable onPress={() => sellMaterial({ item: "iron", state: 1 })}
                                style={{
                                    backgroundColor: colors.kavunKoyu,
                                    borderRadius: 8,
                                    width: 120,
                                    alignItems: "center",
                                    paddingHorizontal: 6,
                                    marginVertical: 6,
                                    paddingVertical: 6,
                                    // opacity: disabled ? 0.52 : 1
                                }}>
                                <Text style={[styles.txtDarkBold]}>70💰 - 70🪨</Text>
                            </Pressable>
                        </View>
                    </View>
                </CardView>
            </ScrollView>
        </ContentView >
    );
};