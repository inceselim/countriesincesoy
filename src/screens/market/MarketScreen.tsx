import React, { Component, useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, Pressable, Alert } from 'react-native';
import { styles } from '../../styles/styles';
import ContentView from '../../components/ContentView/ContentView';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { DataContext } from '../../context/DataContext';
import CardView from '../../components/CardView/CardView';
import HeaderMenuContent from '../../components/HeaderMenu/HeaderMenuContent';
import { Inter1 } from '../../ads/Inter1';

export const MarketScreen = () => {
    const navigation: any = useNavigation();
    const [segment, setSegment] = useState(0);
    const { data, setData, } = useContext(DataContext)
    Inter1()

    const sellMaterial = ({ item, state }: any) => {
        // state 0 sıfır ise satış demektir.
        // state 1 bir ise maden (wood, clay, iron) alış demektir.
        if (state == 0) {
            switch (item) {
                case "wood":
                    setData((prevData: any) => ({
                        ...prevData,
                        gold: prevData.gold + (segment == 0 ? 70 : segment == 1 ? 700 : 7000),
                        wood: prevData.wood - (segment == 0 ? 100 : segment == 1 ? 1000 : 10000),
                    }))
                    break;
                case "clay":
                    setData((prevData: any) => ({
                        ...prevData,
                        gold: prevData.gold + (segment == 0 ? 70 : segment == 1 ? 700 : 7000),
                        clay: prevData.clay - (segment == 0 ? 100 : segment == 1 ? 1000 : 10000)
                    }))
                    break;
                case "iron":
                    setData((prevData: any) => ({
                        ...prevData,
                        gold: prevData.gold + (segment == 0 ? 70 : segment == 1 ? 700 : 7000),
                        iron: prevData.iron - (segment == 0 ? 100 : segment == 1 ? 1000 : 10000)
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
                        gold: prevData.gold - (segment == 0 ? 70 : segment == 1 ? 700 : 7000),
                        wood: prevData.wood + (segment == 0 ? 70 : segment == 1 ? 700 : 7000),
                    }))
                    break;
                case "clay":
                    setData((prevData: any) => ({
                        ...prevData,
                        gold: prevData.gold - (segment == 0 ? 70 : segment == 1 ? 700 : 7000),
                        clay: prevData.clay + (segment == 0 ? 70 : segment == 1 ? 700 : 7000)
                    }))
                    break;
                case "iron":
                    setData((prevData: any) => ({
                        ...prevData,
                        gold: prevData.gold - (segment == 0 ? 70 : segment == 1 ? 700 : 7000),
                        iron: prevData.iron + (segment == 0 ? 70 : segment == 1 ? 700 : 7000)
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
                        justifyContent: "space-between",
                        flex: 1
                    }}>
                        <Pressable onPress={() => {
                            setSegment(0)
                        }}
                            disabled={segment == 0}
                            style={{
                                backgroundColor: segment == 0 ? colors.kavun : colors.kavunKoyu,
                                alignItems: "center",
                                paddingHorizontal: 6,
                                marginVertical: 6,
                                flex: 1,
                                paddingVertical: 6,
                                // opacity: disabled ? 0.52 : 1
                            }}>
                            <Text style={[styles.txtDarkBold]}>1</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            setSegment(1)
                        }}
                            disabled={segment == 1}
                            style={{
                                backgroundColor: segment == 1 ? colors.kavun : colors.kavunKoyu,
                                alignItems: "center",
                                paddingHorizontal: 6,
                                flex: 1,
                                marginVertical: 6,
                                paddingVertical: 6,
                                // opacity: disabled ? 0.52 : 1
                            }}>
                            <Text style={[styles.txtDarkBold]}>10</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            setSegment(2)
                        }}
                            disabled={segment == 2}
                            style={{
                                backgroundColor: segment == 2 ? colors.kavun : colors.kavunKoyu,
                                alignItems: "center",
                                paddingHorizontal: 6,
                                flex: 1,
                                marginVertical: 6,
                                paddingVertical: 6,
                                // opacity: disabled ? 0.52 : 1
                            }}>
                            <Text style={[styles.txtDarkBold]}>100</Text>
                        </Pressable>
                    </View>
                </CardView>
                <CardView>
                    <View style={{
                        flexDirection: "row",
                        paddingBottom: 10,
                    }}>
                        <View style={{ paddingHorizontal: 12, flex: 0.5 }}>
                            <Text style={[styles.txtDarkTitle, { paddingStart: 12, }]}>Sell</Text>
                            <Pressable onPress={() => {
                                sellMaterial({ item: "wood", state: 0 })
                            }}
                                style={{
                                    backgroundColor: colors.kavunKoyu,
                                    borderRadius: 8,

                                    alignItems: "center",
                                    paddingHorizontal: 6,
                                    marginVertical: 6,
                                    paddingVertical: 6,
                                    // opacity: disabled ? 0.52 : 1
                                }}>
                                <Text style={[styles.txtDarkBold]}>{segment == 0 ? 100 : segment == 1 ? 1000 : 10000} 🪵 - {segment == 0 ? 70 : segment == 1 ? 700 : 7000} 💰</Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                sellMaterial({ item: "clay", state: 0 })
                            }}
                                style={{
                                    backgroundColor: colors.kavunKoyu,
                                    borderRadius: 8,

                                    alignItems: "center",
                                    paddingHorizontal: 6,
                                    marginVertical: 6,
                                    paddingVertical: 6,
                                    // opacity: disabled ? 0.52 : 1
                                }}>
                                <Text style={[styles.txtDarkBold]}>{segment == 0 ? 100 : segment == 1 ? 1000 : 10000} 🧱 - {segment == 0 ? 70 : segment == 1 ? 700 : 7000} 💰</Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                sellMaterial({ item: "iron", state: 0 })
                            }}
                                style={{
                                    backgroundColor: colors.kavunKoyu,
                                    borderRadius: 8,

                                    alignItems: "center",
                                    paddingHorizontal: 6,
                                    marginVertical: 6,
                                    paddingVertical: 6,
                                    // opacity: disabled ? 0.52 : 1
                                }}>
                                <Text style={[styles.txtDarkBold]}>{segment == 0 ? 100 : segment == 1 ? 1000 : 10000} 🪨 - {segment == 0 ? 70 : segment == 1 ? 700 : 7000} 💰</Text>
                            </Pressable>
                        </View>

                        <View style={{ paddingStart: 12, flex: 0.5 }}>
                            <Text style={[styles.txtDarkTitle, { paddingStart: 0, }]}>Buy</Text>
                            <Pressable onPress={() => {
                                sellMaterial({ item: "wood", state: 1 })
                            }}
                                style={{
                                    backgroundColor: colors.kavunKoyu,
                                    borderRadius: 8,

                                    alignItems: "center",
                                    paddingHorizontal: 6,
                                    marginVertical: 6,
                                    paddingVertical: 6,
                                    // opacity: disabled ? 0.52 : 1
                                }}>
                                <Text style={[styles.txtDarkBold]}>{segment == 0 ? 70 : segment == 1 ? 700 : 7000} 💰 -  {segment == 0 ? 70 : segment == 1 ? 700 : 7000} 🪵</Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                sellMaterial({ item: "clay", state: 1 })
                            }}
                                style={{
                                    backgroundColor: colors.kavunKoyu,
                                    borderRadius: 8,

                                    alignItems: "center",
                                    paddingHorizontal: 6,
                                    marginVertical: 6,
                                    paddingVertical: 6,
                                    // opacity: disabled ? 0.52 : 1
                                }}>
                                <Text style={[styles.txtDarkBold]}>{segment == 0 ? 70 : segment == 1 ? 700 : 7000} 💰 - {segment == 0 ? 70 : segment == 1 ? 700 : 7000} 🧱</Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                sellMaterial({ item: "iron", state: 1 })
                            }}
                                style={{
                                    backgroundColor: colors.kavunKoyu,
                                    borderRadius: 8,

                                    alignItems: "center",
                                    paddingHorizontal: 6,
                                    marginVertical: 6,
                                    paddingVertical: 6,
                                    // opacity: disabled ? 0.52 : 1
                                }}>
                                <Text style={[styles.txtDarkBold]}>{segment == 0 ? 70 : segment == 1 ? 700 : 7000} 💰 - {segment == 0 ? 70 : segment == 1 ? 700 : 7000} 🪨</Text>
                            </Pressable>
                        </View>
                    </View>
                </CardView>
            </ScrollView>
        </ContentView >
    );
};