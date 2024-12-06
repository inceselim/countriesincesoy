//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import Sound from "react-native-sound"
// create a component
export const App = () => {

    Sound.setCategory('Playback');

    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
    var whoosh = new Sound('bird1.wav', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        whoosh.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });
    });

    // Reduce the volume by half
    whoosh.setVolume(1.0);

    // Position the sound to the full right in a stereo field
    whoosh.setPan(0);
    // Loop indefinitely until stop() is called
    whoosh.setNumberOfLoops(-1);

    // Pause the sound
    whoosh.pause();

    // Stop the sound and rewind to the beginning
    whoosh.stop(() => {
        // Note: If you want to play a sound after stopping and rewinding it,
        // it is important to call play() in a callback.
        whoosh.play();
    });

    // Release the audio player resource
    whoosh.release();



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