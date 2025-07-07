import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { build_income } from '../data/build_income';
import { ArmyMaintenanceGold, ArmyMaintenanceWood, ArmyMaintenanceClay, ArmyMaintenanceIron } from '../utils/ArmyMaintenance';
import { BuildMaintenanceGold, BuildMaintenanceWood, BuildMaintenanceClay, BuildMaintenanceIron } from '../utils/BuildMaintenance';
import Sound from 'react-native-sound';

const DataContext = createContext<any>(undefined);

interface DataContextProviderProps {
    children: ReactNode;
}

// Context sağlayıcısı bileşeni
const DataContextProvider: React.FC<DataContextProviderProps> = ({ children }: any) => {
    const defaultData: any = {
        turn: 1,
        language: "en",
        isAlive: true,
        isTutorial: true,
        news: [],
        canDeclareWar: false,
        countryName: "",
        countryFocus: "attack", //attack, defence, pop, income, premium
        polity: "",
        population: 2900,
        prevPopulation: 0,
        gems: 0,
        gold: 3330,
        prevInflation: 1,
        inflation: 1,
        income: 0,
        wood: 200,
        clay: 200,
        iron: 200,
        parliament: 3,
        castle: 1,
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
        bots: [
            // Bot 1: Saldırı odaklı
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
            // Bot 3: Ekonomi odaklı
            {
                countryName: "Bot3",
                countryFocus: "income",
                polity: "aristocracy",
                population: 2900,
                prevPopulation: 0,
                gems: 0,
                gold: 3000,
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
    }
    const defaultDataBots: any[] =
        [ // Bot 1: Saldırı odaklı
            {
                countryName: "Bot1",
                countryFocus: "attack", //attack, defence, pop, income, premium
                polity: "monarchy",
                population: 3900,
                prevPopulation: 0,
                gems: 0,
                gold: 4030,
                prevInflation: 1,
                inflation: 1,
                income: 0,
                wood: 500,
                clay: 500,
                iron: 500,
                parliament: 4,
                castle: 0,
                tower: 0,
                espionage: 0,
                barracks: 1,
                farm: 4,
                mine: 2,
                woodcutter: 2,
                brickhouse: 2,
                trade_center: 2,
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
                population: 3900,
                prevPopulation: 0,
                gems: 0,
                gold: 3030,
                prevInflation: 1,
                inflation: 1,
                income: 0,
                wood: 500,
                clay: 500,
                iron: 500,
                parliament: 4,
                castle: 0,
                tower: 0,
                espionage: 0,
                barracks: 1,
                farm: 3,
                mine: 2,
                woodcutter: 2,
                brickhouse: 2,
                trade_center: 2,
                avm: 0,
                spearman: 0,
                bowman: 0,
                swordman: 0,
                axeman: 0,
                knight: 0,
                catapult: 0,
            },
            // Bot 3: Ekonomi odaklı
            {
                countryName: "Bot3",
                countryFocus: "income",
                polity: "aristocracy",
                population: 3900,
                prevPopulation: 0,
                gems: 0,
                gold: 5000,
                prevInflation: 1,
                inflation: 1,
                income: 0,
                wood: 500,
                clay: 500,
                iron: 500,
                parliament: 4,
                castle: 0,
                tower: 0,
                espionage: 0,
                barracks: 1,
                farm: 4,
                mine: 2,
                woodcutter: 2,
                brickhouse: 2,
                trade_center: 2,
                avm: 0,
                spearman: 0,
                bowman: 0,
                swordman: 0,
                axeman: 0,
                knight: 0,
                catapult: 0,
            },
        ]

    const [data, setData] = useState<any>(defaultData);
    const [dataBots, setDataBots] = useState<any[]>(defaultDataBots);
    const loadFromStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('@data');
            console.log(value)
            if (value !== null) {
                setData(JSON.parse(value));
            }
        } catch (e) {
            console.error('Hata:', e);
        }
        try {
            const value = await AsyncStorage.getItem('@dataBots');
            if (value !== null) {
                setDataBots(JSON.parse(value));
            }
        } catch (e) {
            console.error('Hata:', e);
        }
    };

    // AsyncStorage'a veri kaydetme
    const saveToStorage = async (value: string,
        bots: any
    ) => {
        try {
            await AsyncStorage.setItem('@data', JSON.stringify(value));
            await AsyncStorage.setItem('@dataBots', JSON.stringify(bots));
        } catch (e) {
            console.error('Hata:', e);
        }
    };
    // const videolar = ["yrbiWj5BGr8"]
    // const [playing, setPlaying] = useState(false);

    // const onStateChange = React.useCallback((state: any) => {
    //     if (state === "ended") {
    //         setPlaying(false);
    //     }
    // }, []);

    // const togglePlaying = useCallback(() => {
    //     setPlaying((prev) => !prev);
    // }, []);

    // const [currentSoundIndex, setCurrentSoundIndex] = useState(0);
    // const [soundInstance, setSoundInstance] = useState<any>(null);

    // // Çalmak istediğiniz ses dosyalarının listesi
    // const soundFiles = ["mehter1.mp3","bg1.mp3", "bird1.wav",  "arrow.wav", "click1.wav"];

    // useEffect(() => {
    //     // İlk ses dosyasını başlat
    //     playSound(currentSoundIndex);

    //     // Cleanup: Sound nesnesini serbest bırak
    //     return () => {
    //         if (soundInstance) {
    //             soundInstance.release();
    //         }
    //     };
    // }, [currentSoundIndex]);

    // const playSound = (index: any) => {
    //     if (index >= soundFiles.length) {
    //         // Eğer listedeki tüm sesler çalındıysa başa dön
    //         setCurrentSoundIndex(0);
    //         return;
    //     }

    //     // Yeni ses nesnesi oluştur
    //     const newSound = new Sound(soundFiles[index], Sound.MAIN_BUNDLE, (error) => {
    //         if (error) {
    //             console.log(`Ses dosyası yüklenemedi: ${soundFiles[index]}`, error);
    //             return;
    //         }
    //         newSound.setVolume(0.2)
    //         console.log(`Şu anda çalıyor: ${soundFiles[index]}`);
    //         newSound.play((success) => {
    //             if (success) {
    //                 console.log(`Bitti: ${soundFiles[index]}`);
    //                 setCurrentSoundIndex((prevIndex: any) => prevIndex + 1); // Sıradaki sesi çal
    //             } else {
    //                 console.log(`Çalma sırasında hata oluştu: ${soundFiles[index]}`);
    //             }
    //         });

    //         // Sound nesnesini state'e kaydet
    //         setSoundInstance(newSound);
    //     });
    // };

    // const stopAllSounds = () => {
    //     if (soundInstance) {
    //         soundInstance.stop(() => {
    //             console.log('Tüm sesler durduruldu.');
    //         });
    //     }
    // };

    let buildIncomeWood: number = ((build_income.woodcutter.wood * data.woodcutter) + (build_income.avm.wood * data.avm))
    let buildIncomeClay: number = ((build_income.brickhouse.clay * data.brickhouse) + (build_income.avm.clay * data.avm))
    let buildIncomeIron: number = ((build_income.mine.iron * data.mine) + (build_income.avm.wood * data.avm))

    let buildMaintenanceGold = BuildMaintenanceGold(data)
    let buildMaintenanceWood = BuildMaintenanceWood(data)
    let buildMaintenanceClay = BuildMaintenanceClay(data)
    let buildMaintenanceIron = BuildMaintenanceIron(data)

    let armyMaintenanceGold = ArmyMaintenanceGold(data)
    let armyMaintenanceWood = ArmyMaintenanceWood(data)
    let armyMaintenanceClay = ArmyMaintenanceClay(data)
    let armyMaintenanceIron = ArmyMaintenanceIron(data)
    return (
        <DataContext.Provider value={{
            data,
            setData,

            dataBots, setDataBots,

            loadFromStorage,
            saveToStorage,

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
        }}>
            {children}
            {/* <YoutubePlayer
                height={0}
                play={true}
                volume={10}
                videoId={videolar[0]}
                onChangeState={onStateChange}
                mute={false}
            /> */}
        </DataContext.Provider>
    );
};

export { DataContextProvider, DataContext, };