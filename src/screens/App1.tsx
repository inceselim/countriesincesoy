//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import Sound from "react-native-sound"
import { PlaySoundClick } from '../utils/PlaySoundClick';
// create a component
export const App = () => {

  



    const defaultDataBots: any =
        [ // Bot 1: Saldırı odaklı
            {
                countryName: "Bot1",
                countryFocus: "attack", //attack, defence, pop, income, premium
                polity: "monarchy",
                population: 2900,
                prevPopulation: 0,
                gems: 0,
                gold: 3030,
                prevInflation: 1,
                inflation: 1,
                income: 0,
                wood: 120,
                clay: 120,
                iron: 120,
                parliament: 3,
                castle: 0,
                tower: 0,
                espionage: 0,
                barracks: 1,
                farm: 3,
                mine: 1,
                woodcutter: 1,
                brickhouse: 1,
                trade_center: 1,
                avm: 0,
                spearman: 0,
                bowman: 0,
                swordman: 0,
                axeman: 0,
                knight: 0,
                catapult: 0,
            },
            // Bot 2: Savunma odaklı
            {
                countryName: "Bot2",
                countryFocus: "defence",
                polity: "theocracy",
                population: 2900,
                prevPopulation: 0,
                gems: 0,
                gold: 3030,
                prevInflation: 1,
                inflation: 1,
                income: 0,
                wood: 120,
                clay: 120,
                iron: 120,
                parliament: 3,
                castle: 0,
                tower: 0,
                espionage: 0,
                barracks: 1,
                farm: 3,
                mine: 1,
                woodcutter: 1,
                brickhouse: 1,
                trade_center: 1,
                avm: 0,
                spearman: 0,
                bowman: 0,
                swordman: 0,
                axeman: 0,
                knight: 0,
                catapult: 0,
            },
        ]
    const [dataBots, setDataBots] = React.useState<any>(defaultDataBots);
    const updateBotBuild = (index: number, build: string) => {
        let tmpBuild = build
        console.log(tmpBuild)
        setDataBots((prevDataBots: any[]) => {
            // Yeni bir array oluşturun
            const updatedBots = [...prevDataBots];
            // Verilen indexteki bot ile işlem yap
            // parametre olarak gelen değerini bir artırın
            updatedBots[index] = {
                ...updatedBots[index],
                [tmpBuild]: (updatedBots[index][tmpBuild]) + 1
            };
            return updatedBots;
        });
    }
    return (
        <SafeAreaView>
            <View>
                <Pressable onPress={() => {
                    updateBotBuild(0, "parliament")
                    //PlaySoundClick()
                }}>
                    <Text style={{ fontSize: 16 }}>Parliament: {dataBots[0].parliament}</Text>
                </Pressable>
                <Pressable onPress={() => {
                    updateBotBuild(0, "barracks")
                }}>
                    <Text style={{ fontSize: 16 }}>barracks: {dataBots[0].barracks}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};