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
                    {
                        data.espionage == 1 ?
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.txtDarkTitle, styles.txtCenter]}>Build Espionage</Text>
                                <Text style={[styles.txtDark]}>You need to build a espionage building for data</Text>
                                <Pressable onPress={() => navigation.navigate("Castle")}
                                    style={{
                                        backgroundColor: colors.kavunKoyu,
                                        borderRadius: 8,
                                        width: 145,
                                        alignItems: "center",
                                        paddingHorizontal: 12,
                                        marginVertical: 8,
                                        paddingVertical: 6,
                                    }}>
                                    <Text style={[styles.txtDarkBold]}>Go Castle</Text>
                                </Pressable>
                            </View>
                            :
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
                                            marginVertical: 8,
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
                                            marginVertical: 8,
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
                                            marginVertical: 8,
                                            paddingVertical: 6,
                                            opacity: segment == 2 ? 0.52 : 1
                                        }}>
                                        <Text style={[styles.txtDarkBold]}>Population</Text>
                                    </Pressable>
                                    <Pressable onPress={() => setSegment(3)}
                                        style={{
                                            backgroundColor: colors.kavunKoyu,
                                            borderRadius: 8,
                                            width: 145,
                                            alignItems: "center",
                                            paddingHorizontal: 12,
                                            marginVertical: 8,
                                            paddingVertical: 6,
                                            opacity: segment == 3 ? 0.52 : 1
                                        }}>
                                        <Text style={[styles.txtDarkBold]}>Trade Center</Text>
                                    </Pressable>
                                </View>

                                <View style={{ paddingStart: 12, flex: 0.7 }}>
                                    <Text style={[styles.txtDarkTitle, { paddingStart: 0, }]}>{segment == 0 ? "Defence Power" : segment == 1 ? "Attack Power" : segment == 3 ? "Trade Center" : "Population"}</Text>
                                    {
                                        segment == 0 ?
                                            <View style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                paddingVertical: 6,
                                            }}>
                                                <Text style={[styles.txtDark, { paddingStart: 0, fontSize: 15, fontWeight: "700", color: colors.black }]}>{data.countryName}</Text>
                                                <Text style={[styles.txtDark, { paddingStart: 0, }]}>{
                                                    (data.spearman * soldier_power.spearman.defence) +
                                                    (data.bowman * soldier_power.bowman.defence) +
                                                    (data.axeman * soldier_power.axeman.defence) +
                                                    (data.swordman * soldier_power.swordman.defence) +
                                                    (data.knight * soldier_power.knight.defence)
                                                }</Text>
                                            </View>
                                            : segment == 1 ?
                                                <View style={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    paddingVertical: 6,
                                                }}>
                                                    <Text style={[styles.txtDark, { paddingStart: 0, fontSize: 15, fontWeight: "700", color: colors.black }]}>{data.countryName}</Text>
                                                    <Text style={[styles.txtDark, { paddingStart: 0, }]}>{
                                                        (data.spearman * soldier_power.spearman.attack) +
                                                        (data.bowman * soldier_power.bowman.attack) +
                                                        (data.axeman * soldier_power.axeman.attack) +
                                                        (data.swordman * soldier_power.swordman.attack) +
                                                        (data.knight * soldier_power.knight.attack)
                                                    }</Text>
                                                </View>
                                                :
                                                segment == 3 ?
                                                    <View style={{
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                        paddingVertical: 6,
                                                    }}>
                                                        <Text style={[styles.txtDark, { paddingStart: 0, fontSize: 15, fontWeight: "700", color: colors.black }]}>{data.countryName}</Text>
                                                        <Text style={[styles.txtDark, { paddingStart: 0, }]}>{
                                                            (data.trade_center)
                                                        }</Text>
                                                    </View>
                                                    :
                                                    <View style={{
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                        paddingVertical: 6,
                                                    }}>
                                                        <Text style={[styles.txtDark, { paddingStart: 0, fontSize: 15, fontWeight: "700", color: colors.black }]}>{data.countryName}</Text>
                                                        <Text style={[styles.txtDark, { paddingStart: 0, }]}>{data.population}</Text>
                                                    </View>
                                    }
                                    {
                                        data?.bots.map((i: any, index: number) => {
                                            console.log("i: ", i)
                                            return (
                                                <View key={index} style={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    paddingVertical: 6,
                                                }}>
                                                    <Text style={[styles.txtDark, { paddingStart: 0, fontSize: 15, fontWeight: "700", color: colors.black }]}>{i.countryName}</Text>
                                                    {
                                                        segment == 0 ?
                                                            <Text style={[styles.txtDark, { paddingStart: 0, }]}>{
                                                                (i.spearman * soldier_power.spearman.defence) +
                                                                (i.bowman * soldier_power.bowman.defence) +
                                                                (i.axeman * soldier_power.axeman.defence) +
                                                                (i.swordman * soldier_power.swordman.defence) +
                                                                (i.knight * soldier_power.knight.defence)
                                                            }</Text>
                                                            : segment == 1 ?
                                                                <Text style={[styles.txtDark, { paddingStart: 0, }]}>{
                                                                    (i.spearman * soldier_power.spearman.attack) +
                                                                    (i.bowman * soldier_power.bowman.attack) +
                                                                    (i.axeman * soldier_power.axeman.attack) +
                                                                    (i.swordman * soldier_power.swordman.attack) +
                                                                    (i.knight * soldier_power.knight.attack)
                                                                }</Text>
                                                                : segment == 3 ?
                                                                    <Text style={[styles.txtDark, { paddingStart: 0, }]}>{
                                                                        (i.trade_center)
                                                                    }</Text>
                                                                    :
                                                                    <Text style={[styles.txtDark, { paddingStart: 0, }]}>{
                                                                        i.population}</Text>

                                                    }
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                    }
                </CardView>
            </ScrollView>
        </ContentView >
    );
};