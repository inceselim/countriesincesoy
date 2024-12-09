//import liraries
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
import HeaderMenuContent from '../../components/HeaderMenu/HeaderMenuContent';
import G1 from '../../ads/G1';
import { PlaySoundClickLevel } from '../../utils/PlaySoundClickLevel';

// create a component
const ArmyScreen = () => {
    // REKLAM
    G1()
    const navigation: any = useNavigation();
    let { data, setData } = useContext(DataContext);
    return (
        <ContentView>
            <HeaderMenuContent title={"Army"} />
            <ScrollView style={{
                paddingHorizontal: "2%",
            }}>
                <CardView>
                    <Image source={require("../../assets/armies/barracks.png")}
                        style={{
                            height: 80,
                            width: 80,
                            resizeMode: "contain"
                        }} />
                    <View style={{ paddingStart: 12, flex: 1 }}>
                        <Text style={[styles.txtDarkTitle, { paddingStart: 0, color: data?.barracks * 50 <= calculateSoldierAmount(data) ? colors.red : colors.black }]}>Barracks - Level: {data?.barracks} Capacity: {data?.barracks * 50 + " / " + calculateSoldierAmount(data)}</Text>
                        <Text style={styles.txtDark}>Barracks determine the soldier capacity. Increase the barracks level to be able to produce soldiers.</Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 6
                        }}>
                            <View>
                                <Text style={[styles.txtDark, { marginTop: 6 }]}>Price: 100</Text>
                                <Text style={[styles.txtDark, { marginTop: 6 }]}>Maintenance: 10</Text>
                                <Text style={[styles.txtDark, { marginTop: 6 }]}>Capacity per level: 50</Text>
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
                                    onPress={() => {
                                        BarracksUpdate(data, setData)
                                        PlaySoundClickLevel()
                                    }}
                                    disabled={(data.gold < build_costs.barracks.gold || data.barracks >= 20 || data.wood < build_costs.barracks.wood || data.clay < build_costs.barracks.clay || data.clay < build_costs.barracks.clay || data.iron < build_costs.barracks.iron)} />
                            </View>

                        </View>
                    </View>
                </CardView>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap"
                }}>
                    <CardView>
                        <View>
                            <Image source={require("../../assets/armies/spearman512.png")}
                                style={{
                                    height: 70,
                                    width: 70,
                                    marginHorizontal: 6,
                                    marginVertical: 4,
                                    borderRadius: 70,
                                    borderWidth: 1,
                                    borderColor: "#000"
                                }} />
                        </View>
                        <View style={{ paddingStart: 12 }}>
                            <Text style={[styles.txtDarkTitle, {
                                paddingStart: 0
                            }]}>Spearman</Text>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Attack: {soldier_power.spearman.attack}</Text>
                                <Text style={styles.txtDark}>Defence: {soldier_power.spearman.defence}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Price: {soldier_costs.spearman.gold > 0 && soldier_costs.spearman.gold + "💰"} {soldier_costs.spearman.wood > 0 && soldier_costs.spearman.wood + "🪵"} {soldier_costs.spearman.clay > 0 && soldier_costs.spearman.clay + "🧱"} {soldier_costs.spearman.iron > 0 && soldier_costs.spearman.iron + "🪨"} {soldier_costs.spearman.population > 0 && soldier_costs.spearman.population + "🫂"}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Maintenance</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>{soldier_maintenance.spearman.gold} Gold</Text>
                                <Text style={styles.txtDark}>{soldier_maintenance.spearman.wood} Wood</Text>
                                <Text style={styles.txtDark}>{soldier_maintenance.spearman.iron} Iron</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Amount: {data.spearman}</Text>
                                <ButtonSelect text={"+"} onPress={() => RecruitSoldier("spearman", data, setData)}
                                    disabled={((data.barracks * 50 <= calculateSoldierAmount(data)) || data.gold < soldier_costs.spearman.gold || data.wood < soldier_costs.spearman.wood || data.clay < soldier_costs.spearman.clay || data.clay < soldier_costs.spearman.clay || data.iron < soldier_costs.spearman.iron)} />
                            </View>
                        </View>
                    </CardView>

                    <CardView>
                        <View>
                            <Image source={require("../../assets/armies/bowman512.png")}
                                style={{
                                    height: 70,
                                    width: 70,
                                    marginHorizontal: 6,
                                    marginVertical: 4,
                                    borderRadius: 70,
                                    borderWidth: 1,
                                    borderColor: "#000"
                                }} />
                        </View>
                        <View style={{ paddingStart: 12 }}>
                            <Text style={[styles.txtDarkTitle, {
                                paddingStart: 0
                            }]}>Bowman</Text>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Attack: {soldier_power.bowman.attack}</Text>
                                <Text style={styles.txtDark}>Defence: {soldier_power.bowman.defence}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Price: {soldier_costs.bowman.gold > 0 && soldier_costs.bowman.gold + "💰"} {soldier_costs.bowman.wood > 0 && soldier_costs.bowman.wood + "🪵"} {soldier_costs.bowman.clay > 0 && soldier_costs.bowman.clay + "🧱"} {soldier_costs.bowman.iron > 0 && soldier_costs.bowman.iron + "🪨"} {soldier_costs.bowman.population > 0 && soldier_costs.bowman.population + "🫂"}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Maintenance</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>{soldier_maintenance.bowman.gold} Gold</Text>
                                <Text style={styles.txtDark}>{soldier_maintenance.bowman.wood} Wood</Text>
                                <Text style={styles.txtDark}>{soldier_maintenance.bowman.iron} Iron</Text>
                                <Text style={styles.txtDark}>{soldier_maintenance.bowman.pop} Pop</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Amount: {data.bowman}</Text>
                                <ButtonSelect text={"+"} onPress={() => RecruitSoldier("bowman", data, setData)}
                                    disabled={((data.barracks * 50 <= calculateSoldierAmount(data)) || data.gold < soldier_costs.bowman.gold || data.wood < soldier_costs.bowman.wood || data.clay < soldier_costs.bowman.clay || data.clay < soldier_costs.bowman.clay || data.iron < soldier_costs.bowman.iron)} />
                            </View>
                        </View>
                    </CardView>

                    <CardView>
                        <View>
                            <Image source={require("../../assets/armies/swordman512.png")}
                                style={{
                                    height: 70,
                                    width: 70,
                                    marginHorizontal: 6,
                                    marginVertical: 4,
                                    borderRadius: 70,
                                    borderWidth: 1,
                                    borderColor: "#000"
                                }} />
                        </View>
                        <View style={{ paddingStart: 12 }}>
                            <Text style={[styles.txtDarkTitle, {
                                paddingStart: 0
                            }]}>Swordman</Text>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Attack: {soldier_power.swordman.attack}</Text>
                                <Text style={styles.txtDark}>Defence: {soldier_power.swordman.defence}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Price: {soldier_costs.swordman.gold > 0 && soldier_costs.swordman.gold + "💰"} {soldier_costs.swordman.wood > 0 && soldier_costs.swordman.wood + "🪵"} {soldier_costs.swordman.clay > 0 && soldier_costs.swordman.clay + "🧱"} {soldier_costs.swordman.iron > 0 && soldier_costs.swordman.iron + "🪨"} {soldier_costs.swordman.population > 0 && soldier_costs.swordman.population + "🫂"}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Maintenance</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>{soldier_maintenance.swordman.gold} Gold</Text>
                                <Text style={styles.txtDark}>{soldier_maintenance.swordman.wood} Wood</Text>
                                <Text style={styles.txtDark}>{soldier_maintenance.swordman.iron} Iron</Text>
                                <Text style={styles.txtDark}>{soldier_maintenance.swordman.pop} Pop</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Amount: {data.swordman}</Text>
                                <ButtonSelect text={"+"} onPress={() => RecruitSoldier("swordman", data, setData)}
                                    disabled={((data.barracks * 50 <= calculateSoldierAmount(data)) || data.gold < soldier_costs.swordman.gold || data.wood < soldier_costs.swordman.wood || data.clay < soldier_costs.swordman.clay || data.clay < soldier_costs.swordman.clay || data.iron < soldier_costs.swordman.iron)} />
                            </View>
                        </View>
                    </CardView>

                    <CardView>
                        <View>
                            <Image source={require("../../assets/armies/axeman512.png")}
                                style={{
                                    height: 70,
                                    width: 70,
                                    marginHorizontal: 6,
                                    marginVertical: 4,
                                    borderRadius: 70,
                                    borderWidth: 1,
                                    borderColor: "#000"
                                }} />
                        </View>
                        <View style={{ paddingStart: 12 }}>
                            <Text style={[styles.txtDarkTitle, {
                                paddingStart: 0
                            }]}>Axeman</Text>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Attack: {soldier_power.axeman.attack}</Text>
                                <Text style={styles.txtDark}>Defence: {soldier_power.axeman.defence}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Price: {soldier_costs.axeman.gold > 0 && soldier_costs.axeman.gold + "💰"} {soldier_costs.axeman.wood > 0 && soldier_costs.axeman.wood + "🪵"} {soldier_costs.axeman.clay > 0 && soldier_costs.axeman.clay + "🧱"} {soldier_costs.axeman.iron > 0 && soldier_costs.axeman.iron + "🪨"} {soldier_costs.axeman.population > 0 && soldier_costs.axeman.population + "🫂"}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Maintenance</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>{soldier_maintenance.axeman.gold} Gold</Text>
                                <Text style={styles.txtDark}>{soldier_maintenance.axeman.wood} Wood</Text>
                                <Text style={styles.txtDark}>{soldier_maintenance.axeman.iron} Iron</Text>
                                <Text style={styles.txtDark}>{soldier_maintenance.axeman.pop} Pop</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Amount: {data.axeman}</Text>
                                <ButtonSelect text={"+"} onPress={() => RecruitSoldier("axeman", data, setData)}
                                    disabled={((data.barracks * 50 <= calculateSoldierAmount(data)) || data.gold < soldier_costs.axeman.gold || data.wood < soldier_costs.axeman.wood || data.clay < soldier_costs.axeman.clay || data.clay < soldier_costs.axeman.clay || data.iron < soldier_costs.axeman.iron)} />
                            </View>
                        </View>
                    </CardView>

                    <CardView>
                        <View>
                            <Image source={require("../../assets/armies/knight512.png")}
                                style={{
                                    height: 70,
                                    width: 70,
                                    marginHorizontal: 6,
                                    marginVertical: 4,
                                    borderRadius: 70,
                                    borderWidth: 1,
                                    borderColor: "#000"
                                }} />
                        </View>
                        <View style={{ paddingStart: 12 }}>
                            <Text style={[styles.txtDarkTitle, {
                                paddingStart: 0
                            }]}>Knight</Text>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Attack: {soldier_power.knight.attack}</Text>
                                <Text style={styles.txtDark}>Defence: {soldier_power.knight.defence}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Price: {soldier_costs.knight.gold > 0 && soldier_costs.knight.gold + "💰"} {soldier_costs.knight.wood > 0 && soldier_costs.knight.wood + "🪵"} {soldier_costs.knight.clay > 0 && soldier_costs.knight.clay + "🧱"} {soldier_costs.knight.iron > 0 && soldier_costs.knight.iron + "🪨"} {soldier_costs.knight.population > 0 && soldier_costs.knight.population + "🫂"}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Maintenance</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>{soldier_maintenance.knight.gold} Gold</Text>
                                <Text style={styles.txtDark}>{soldier_maintenance.knight.wood} Wood</Text>
                                <Text style={styles.txtDark}>{soldier_maintenance.knight.iron} Iron</Text>
                                <Text style={styles.txtDark}>{soldier_maintenance.knight.pop} Pop</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Amount: {data.knight}</Text>
                                <ButtonSelect text={"+"} onPress={() => RecruitSoldier("knight", data, setData)}
                                    disabled={((data.barracks * 50 <= calculateSoldierAmount(data)) || data.gold < soldier_costs.knight.gold || data.wood < soldier_costs.knight.wood || data.clay < soldier_costs.knight.clay || data.clay < soldier_costs.knight.clay || data.iron < soldier_costs.knight.iron)} />
                            </View>
                        </View>
                    </CardView>

                    <CardView>
                        <View>
                            <Image source={require("../../assets/armies/catapult512.png")}
                                style={{
                                    height: 70,
                                    width: 70,
                                    marginHorizontal: 6,
                                    marginVertical: 4,
                                    borderRadius: 70,
                                    borderWidth: 1,
                                    borderColor: "#000"
                                }} />
                        </View>
                        <View style={{ paddingStart: 12 }}>
                            <Text style={[styles.txtDarkTitle, {
                                paddingStart: 0
                            }]}>Catapult</Text>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Attack: {soldier_power.catapult.attack}</Text>
                                <Text style={styles.txtDark}>Defence: {soldier_power.catapult.defence}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Price: {soldier_costs.catapult.gold > 0 && soldier_costs.catapult.gold + "💰"} {soldier_costs.catapult.wood > 0 && soldier_costs.catapult.wood + "🪵"} {soldier_costs.catapult.clay > 0 && soldier_costs.catapult.clay + "🧱"} {soldier_costs.catapult.iron > 0 && soldier_costs.catapult.iron + "🪨"} {soldier_costs.catapult.population > 0 && soldier_costs.catapult.population + "🫂"}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Maintenance</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>{soldier_maintenance.catapult.gold} Gold</Text>
                                <Text style={styles.txtDark}>{soldier_maintenance.catapult.wood} Wood</Text>
                                <Text style={styles.txtDark}>{soldier_maintenance.catapult.iron} Iron</Text>
                                <Text style={styles.txtDark}>{soldier_maintenance.catapult.pop} Pop</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Amount: {data.catapult}</Text>
                                <ButtonSelect text={"+"} onPress={() => RecruitSoldier("catapult", data, setData)}
                                    disabled={((data.barracks * 50 <= calculateSoldierAmount(data)) || data.gold < soldier_costs.catapult.gold || data.wood < soldier_costs.catapult.wood || data.clay < soldier_costs.catapult.clay || data.clay < soldier_costs.catapult.clay || data.iron < soldier_costs.catapult.iron)} />
                            </View>
                        </View>
                    </CardView>
                </View>
            </ScrollView>
        </ContentView >
    );
};


//make this component available to the app
export default ArmyScreen;
