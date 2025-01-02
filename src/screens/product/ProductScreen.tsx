import React, { Component, useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, Pressable, Alert } from 'react-native';
import { styles } from '../../styles/styles';
import ContentView from '../../components/ContentView/ContentView';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { DataContext } from '../../context/DataContext';
import ButtonSelect from '../../components/ButtonSelect/ButtonSelect';
import CardView from '../../components/CardView/CardView';
import { build_costs } from '../../data/build_costs';
import { build_maintenance } from '../../data/build_maintenance';
import HeaderMenuContent from '../../components/HeaderMenu/HeaderMenuContent';
import { BuildUpdate } from '../../utils/BuildUpdate';
import { build_income } from '../../data/build_income';
import G1 from '../../ads/G1';
import { PlaySoundClickLevel } from '../../utils/PlaySoundClickLevel';

// create a component
const ProductScreen = () => {
    const navigation: any = useNavigation();
    // REKLAM
    // G1()
    let { data, setData } = useContext(DataContext);
    return (
        <ContentView>
            <HeaderMenuContent title={"Product"} />
            <ScrollView style={{
                paddingHorizontal: "2%",
            }}>
                <CardView>
                    <Image source={require("../../assets/build/farm1.png")}
                        style={{
                            height: 90,
                            width: 100,
                            resizeMode: "contain"
                        }} />
                    <View style={{ paddingStart: 12, flex: 1 }}>
                        <Text style={[styles.txtDarkTitle, { paddingStart: 0, color: data.farm * 1000 <= data.population ? colors.red : colors.black }]}>Farm - Level: {data.farm} Capacity: {data.farm * 1000 + " / " + data.population}</Text>
                        <Text style={styles.txtDark}>Capacity of Population</Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 6
                        }}>
                            <View>
                                <Text style={[styles.txtDark, { marginTop: 6 }]}>Price: {build_costs.farm.gold > 0 && build_costs.farm.gold + "💰"} {build_costs.farm.wood > 0 && build_costs.farm.wood + "🪵"} {build_costs.farm.clay > 0 && build_costs.farm.clay + "🧱"} {build_costs.farm.iron > 0 && build_costs.farm.iron + "🪨"}</Text>
                                <Text style={[styles.txtDark, { marginTop: 6 }]}>Maintenance: {build_maintenance.farm.gold > 0 && build_maintenance.farm.gold + "💰"} {build_maintenance.farm.wood > 0 && build_maintenance.farm.wood + "🪵"} {build_maintenance.farm.clay > 0 && build_maintenance.farm.clay + "🧱"} {build_maintenance.farm.iron > 0 && build_maintenance.farm.iron + "🪨"}</Text>
                                <Text style={[styles.txtDark, { marginTop: 6 }]}>Capacity per level: 1k</Text>
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
                                        //PlaySoundClickLevel()
                                        BuildUpdate("farm", data, setData)
                                    }}
                                    disabled={!(data.gold >= build_costs.farm.gold && data.wood >= build_costs.farm.wood && data.clay >= build_costs.farm.clay && data.iron >= build_costs.farm.iron)} />
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
                            <Image source={require("../../assets/build/mine.png")}
                                style={{
                                    height: 70,
                                    width: 70,
                                    marginHorizontal: 6,
                                    marginVertical: 4,
                                    borderColor: "#000"
                                }} />
                        </View>
                        <View style={{ paddingStart: 12 }}>
                            <Text style={[styles.txtDarkTitle, {
                                paddingStart: 0
                            }]}>Mine</Text>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Production: {build_income.mine.gold > 0 && build_income.mine.gold + "💰"} {build_income.mine.wood > 0 && build_income.mine.wood + "🪵"} {build_income.mine.clay > 0 && build_income.mine.clay + "🧱"} {build_income.mine.iron > 0 && build_income.mine.iron + "🪨"}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 4
                            }}>
                                <Text style={styles.txtDark}>Price: {build_costs.mine.gold > 0 && build_costs.mine.gold + "💰"} {build_costs.mine.wood > 0 && build_costs.mine.wood + "🪵"} {build_costs.mine.clay > 0 && build_costs.mine.clay + "🧱"} {build_costs.mine.iron > 0 && build_costs.mine.iron + "🪨"}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Amount: {data.mine}</Text>
                                <ButtonSelect text={"+"} onPress={() => {
                                    //PlaySoundClickLevel()
                                    BuildUpdate("mine", data, setData)
                                }}
                                    disabled={!(data.gold >= build_costs.mine.gold && data.wood >= build_costs.mine.wood && data.clay >= build_costs.mine.clay)} />
                            </View>
                        </View>
                    </CardView>

                    <CardView>
                        <View>
                            <Image source={require("../../assets/build/woodcutter.png")}
                                style={{
                                    height: 70,
                                    width: 70,
                                    marginHorizontal: 6,
                                    marginVertical: 4,
                                    borderColor: "#000"
                                }} />
                        </View>
                        <View style={{ paddingStart: 12 }}>
                            <Text style={[styles.txtDarkTitle, {
                                paddingStart: 0
                            }]}>WoodCutter</Text>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Production: {build_income.woodcutter.gold > 0 && build_income.woodcutter.gold + "💰"} {build_income.woodcutter.wood > 0 && build_income.woodcutter.wood + "🪵"} {build_income.woodcutter.clay > 0 && build_income.woodcutter.clay + "🧱"} {build_income.woodcutter.iron > 0 && build_income.woodcutter.iron + "🪨"}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 4
                            }}>
                                <Text style={styles.txtDark}>Price: {build_costs.woodcutter.gold > 0 && build_costs.woodcutter.gold + "💰"} {build_costs.woodcutter.wood > 0 && build_costs.woodcutter.wood + "🪵"} {build_costs.woodcutter.clay > 0 && build_costs.woodcutter.clay + "🧱"} {build_costs.woodcutter.iron > 0 && build_costs.woodcutter.iron + "🪨"}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Amount: {data.woodcutter}</Text>
                                <ButtonSelect text={"+"} onPress={() => {
                                    //PlaySoundClickLevel()
                                    BuildUpdate("woodcutter", data, setData)
                                }}
                                    disabled={!(data.gold >= build_costs.woodcutter.gold && data.clay >= build_costs.woodcutter.clay && data.iron >= build_costs.woodcutter.iron)} />
                            </View>
                        </View>
                    </CardView>

                    <CardView>
                        <View>
                            <Image source={require("../../assets/build/clay.png")}
                                style={{
                                    height: 70,
                                    width: 70,
                                    marginHorizontal: 6,
                                    marginVertical: 4,
                                    borderColor: "#000"
                                }} />
                        </View>
                        <View style={{ paddingStart: 12 }}>
                            <Text style={[styles.txtDarkTitle, {
                                paddingStart: 0
                            }]}>Brickhouse</Text>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Production: {build_income.brickhouse.gold > 0 && build_income.brickhouse.gold + "💰"} {build_income.brickhouse.wood > 0 && build_income.brickhouse.wood + "🪵"} {build_income.brickhouse.clay > 0 && build_income.brickhouse.clay + "🧱"} {build_income.brickhouse.iron > 0 && build_income.brickhouse.iron + "🪨"}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 4
                            }}>
                                <Text style={styles.txtDark}>Price: {build_costs.brickhouse.gold > 0 && build_costs.brickhouse.gold + "💰"} {build_costs.brickhouse.wood > 0 && build_costs.brickhouse.wood + "🪵"} {build_costs.brickhouse.clay > 0 && build_costs.brickhouse.clay + "🧱"} {build_costs.brickhouse.iron > 0 && build_costs.brickhouse.iron + "🪨"}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Amount: {data.brickhouse}</Text>
                                <ButtonSelect text={"+"} onPress={() => {
                                    //PlaySoundClickLevel()
                                    BuildUpdate("brickhouse", data, setData)
                                }}
                                    disabled={!(data.gold >= build_costs.brickhouse.gold && data.wood >= build_costs.brickhouse.wood && data.iron >= build_costs.brickhouse.iron)} />
                            </View>
                        </View>
                    </CardView>

                    <CardView>
                        <View>
                            <Image source={require("../../assets/build/trade_center.png")}
                                style={{
                                    height: 70,
                                    width: 70,
                                    marginHorizontal: 6,
                                    marginVertical: 4,
                                    borderColor: "#000"
                                }} />
                        </View>
                        <View style={{ paddingStart: 12 }}>
                            <Text style={[styles.txtDarkTitle, {
                                paddingStart: 0
                            }]}>Trade Center</Text>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Production: {build_costs.trade_center.gold > 0 && build_income.trade_center.gold + "💰"} {build_income.trade_center.wood > 0 && build_income.trade_center.wood + "🪵"} {build_income.trade_center.clay > 0 && build_income.trade_center.clay + "🧱"} {build_income.trade_center.iron > 0 && build_income.trade_center.iron + "🪨"}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 4
                            }}>
                                <Text style={styles.txtDark}>Price: {build_costs.trade_center.gold > 0 && build_costs.trade_center.gold + "💰"} {build_costs.trade_center.wood > 0 && build_costs.trade_center.wood + "🪵"} {build_costs.trade_center.clay > 0 && build_costs.trade_center.clay + "🧱"} {build_costs.trade_center.iron > 0 && build_costs.trade_center.iron + "🪨"}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Amount: {data.trade_center}</Text>
                                <ButtonSelect text={"+"} onPress={() => BuildUpdate("trade_center", data, setData)}
                                    disabled={!(data.gold >= build_costs.trade_center.gold && data.wood >= build_costs.trade_center.wood && data.clay >= build_costs.trade_center.clay && data.iron >= build_costs.trade_center.iron)} />
                            </View>
                        </View>
                    </CardView>

                    <CardView>
                        <View>
                            <Image source={require("../../assets/build/avm.png")}
                                style={{
                                    height: 70,
                                    width: 70,
                                    marginHorizontal: 6,
                                    marginVertical: 4,
                                    borderColor: "#000"
                                }} />
                        </View>
                        <View style={{ paddingStart: 12 }}>
                            <Text style={[styles.txtDarkTitle, {
                                paddingStart: 0
                            }]}>AVM</Text>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Production: {build_income.avm.gold > 0 && build_income.avm.gold}💰 {build_income.avm.wood > 0 && build_income.avm.wood}🪵 {build_income.avm.clay > 0 && build_income.avm.clay}🧱 {build_income.avm.iron > 0 && build_income.avm.iron}🪨</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 4
                            }}>
                                <Text style={styles.txtDark}>Price: {build_costs.avm.gems > 0 && build_costs.avm.gems}💎</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={styles.txtDark}>Amount: {data.avm}</Text>
                                <ButtonSelect text={"+"} onPress={() => {
                                    //PlaySoundClickLevel()
                                    BuildUpdate("avm", data, setData)
                                }}
                                    disabled={(data.gems < 1)} />
                            </View>
                        </View>
                    </CardView>
                </View>
            </ScrollView>
        </ContentView >
    );
};
export default ProductScreen;
