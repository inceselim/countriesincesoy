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

const CastleScreen = () => {
    const navigation: any = useNavigation();
    let { data, setData } = useContext(DataContext);
    // REKLAM
    // G1()
    return (
        <ContentView>
            <HeaderMenuContent title={"Castle"} />
            <ScrollView style={{
                paddingHorizontal: "2%",
            }}>
                <CardView>
                    <Image source={require("../../assets/castle.png")}
                        style={{
                            height: 80,
                            width: 80,
                            resizeMode: "contain"
                        }} />
                    <View style={{ paddingStart: 12, flex: 1 }}>
                        <Text style={[styles.txtDarkTitle, { paddingStart: 0, color: data.castle >= 20 ? colors.red : colors.black }]}>Castle - Level: {data.castle} Bonus: {data.castle * build_defence_powers.castle.defence_bonus}</Text>
                        <Text style={styles.txtDark}>Defence Power: {build_defence_powers.castle.defence * data.castle}</Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 6
                        }}>
                            <View>
                                <Text style={[styles.txtDark, { marginTop: 6 }]}>Price: {build_costs.castle.gold > 0 && build_costs.castle.gold + "💰"} {build_costs.castle.wood > 0 && build_costs.castle.wood + "🪵"} {build_costs.castle.clay > 0 && build_costs.castle.clay + "🧱"} {build_costs.castle.iron > 0 && build_costs.castle.iron + "🪨"}</Text>
                                <Text style={[styles.txtDark, { marginTop: 6 }]}>Maintenance: {build_maintenance.castle.gold}</Text>
                                <Text style={[styles.txtDark, { marginTop: 6 }]}>Max: 20</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginVertical: 6
                            }}>
                                <Text style={[styles.txtDarkBold, {
                                    marginVertical: 6,
                                    marginEnd: 12
                                }]}></Text>
                                <ButtonSelect text={"Level Up"}
                                    onPress={() => BuildUpdate("castle", data, setData)}
                                    disabled={(data.gold < build_costs.castle.gold || data.castle >= 20 || data.wood < build_costs.castle.wood || data.clay < build_costs.castle.clay || data.clay < build_costs.castle.clay || data.iron < build_costs.castle.iron)} />
                            </View>
                        </View>
                    </View>
                </CardView>

                <CardView>
                    <Image source={require("../../assets/tower512.png")}
                        style={{
                            height: 80,
                            width: 80,
                            resizeMode: "contain"
                        }} />
                    <View style={{ paddingStart: 12, flex: 1 }}>
                        <Text style={[styles.txtDarkTitle, { paddingStart: 0, color: data.tower >= 20 ? colors.red : colors.black }]}>Tower - Level: {data.tower}</Text>
                        <Text style={styles.txtDark}>Defence: {build_defence_powers.tower.defence * data.tower}</Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 6
                        }}>
                            <View>
                                <Text style={[styles.txtDark, { marginTop: 6 }]}>Price: {build_costs.tower.gold > 0 && build_costs.tower.gold + "💰"} {build_costs.tower.wood > 0 && build_costs.tower.wood + "🪵"} {build_costs.tower.clay > 0 && build_costs.tower.clay + "🧱"} {build_costs.tower.iron > 0 && build_costs.tower.iron + "🪨"}</Text>
                                <Text style={[styles.txtDark, { marginTop: 6 }]}>Maintenance: {build_maintenance.tower.gold}</Text>
                                <Text style={[styles.txtDark, { marginTop: 6 }]}>Max: 20</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginVertical: 6
                            }}>
                                <Text style={[styles.txtDarkBold, {
                                    marginVertical: 6,
                                    marginEnd: 12
                                }]}></Text>
                                <ButtonSelect text={"Level Up"}
                                    onPress={() => BuildUpdate("tower", data, setData)}
                                    disabled={(data.gold < build_costs.tower.gold || data.tower >= 20 || data.wood < build_costs.tower.wood || data.clay < build_costs.tower.clay || data.clay < build_costs.tower.clay || data.iron < build_costs.tower.iron)} />
                            </View>
                        </View>
                    </View>
                </CardView>

                <CardView>
                    <Image source={require("../../assets/espionage.png")}
                        style={{
                            height: 80,
                            width: 80,
                            resizeMode: "contain"
                        }} />
                    <View style={{ paddingStart: 12, flex: 1 }}>
                        <Text style={[styles.txtDarkTitle, { paddingStart: 0 }]}>Espionage - Level: {data.espionage}</Text>
                        <Text style={styles.txtDark}>You need to build a espionage building for data</Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 6
                        }}>
                            <View>
                                <Text style={[styles.txtDark, { marginTop: 6 }]}>Price: {build_costs.espionage.gems > 0 && build_costs.espionage.gems + "💎"} {build_costs.espionage.wood > 0 && build_costs.espionage.wood + "🪵"} {build_costs.espionage.clay > 0 && build_costs.espionage.clay + "🧱"} {build_costs.espionage.iron > 0 && build_costs.espionage.iron + "🪨"}</Text>
                                <Text style={[styles.txtDark, { marginTop: 6 }]}>Maintenance: {build_maintenance.espionage.gold}💰</Text>
                                <Text style={[styles.txtDark, { marginTop: 6 }]}>Max: 1</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginVertical: 6
                            }}>
                                <Text style={[styles.txtDarkBold, {
                                    marginVertical: 6,
                                    marginEnd: 12
                                }]}></Text>
                                <ButtonSelect text={data.espionage == 0 ? "Create" : "Created"}
                                    onPress={() => BuildUpdate("tower", data, setData)}
                                    disabled={(data.gems < build_costs.espionage.gems || data.espionage >= 1)} />
                            </View>

                        </View>
                    </View>
                </CardView>
            </ScrollView>
        </ContentView >
    );
};

export default CastleScreen;
