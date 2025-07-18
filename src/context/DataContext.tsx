import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CalculatePopBot, CalculatePopPlayer } from '../service/population';
import { calculateTurnIncome } from '../service/turnIncome';

const DataContext = createContext<any>(undefined);
interface DataContextProviderProps {
    children: ReactNode;
}
const DataContextProvider: React.FC<DataContextProviderProps> = ({ children }: any) => {
    const [currentTurn, setCurrentTurn] = useState(0)
    const [dataBots, setDataBots] = useState<any[]>([]); // burayı istediğin sayıya göre ayarla
    const defaultData: any = {
        turn: 1,
        language: "en",
        difficult: "0", // 0: seçim yapılmadı, 1: easy, 2: normal, ...
        isAlive: true,
        isTutorial: false,
        news: [],
        canDeclareWar: false,
        countryName: "",
        countryFocus: "pop", // attack, defence, income, premium, pop
        polity: "Democracy", // Monarchy, Theocracy, Dictator, Aristocracy, Democracy
        population: 4500,
        prevPopulation: 4350,

        // Vergi ve nüfus sistemleri
        taxRate: 40,
        taxGoldPerTurn: 13, // 40 * 0.333
        populationGrowthRate: 0.0044, // 0.006 - ((40 - 10) / 80) * 0.005

        gems: 0,
        gold: 1800,
        wood: 500,
        clay: 400,
        iron: 300,

        // Ekonomi
        income: 0,
        prevInflation: 1,
        inflation: 1,

        // Binalar
        parliament: 3,
        castle: 1,
        tower: 0,
        espionage: 0,
        barracks: 1,
        farm: 4,
        mine: 2,
        woodcutter: 2,
        brickhouse: 2,
        trade_center: 5,
        avm: 1,

        // Askerler
        spearman: 10,
        bowman: 15,
        swordman: 5,
        axeman: 8,
        knight: 4,
        catapult: 2,
    }

    const [data, setData] = useState<any>(defaultData);
    const restartGame = async () => {
        setData(defaultData)
    };
    const addGems = async (x: number) => {
        setData((prevData: any) => ({
            ...prevData,
            gems: prevData.gems + x
        }));
    };
    const decreaseGems = async (x: number) => {
        setData((prevData: any) => ({
            ...prevData,
            gems: prevData.gems - x
        }));
    };
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

    useEffect(() => {
        // Oyuncu ülke seçmeden tur başlamasın
        if (data?.difficult == 0 || data?.isTutorial == true) return;

        const interval = setInterval(() => {
            setCurrentTurn((prev) => prev + 1);

            // 1. Oyuncu için kaynak ve nüfus hesaplama
            setData((prevData: any) => {
                const income = calculateTurnIncome(prevData);
                return {
                    ...prevData,
                    gold: prevData.gold + income.gold,
                    wood: prevData.wood + income.wood,
                    clay: prevData.clay + income.clay,
                    iron: prevData.iron + income.iron,
                    prevPopulation: prevData.population,
                    population: CalculatePopPlayer(prevData)
                };
            });

            // 2. Botlar için kaynak ve nüfus hesaplama
            setDataBots((prevBots: any[]) =>
                prevBots.map((bot: any) => {
                    const income = calculateTurnIncome(bot);
                    return {
                        ...bot,
                        gold: bot.gold + income.gold,
                        wood: bot.wood + income.wood,
                        clay: bot.clay + income.clay,
                        iron: bot.iron + income.iron,
                        prevPopulation: bot.population,
                        population: CalculatePopBot(bot)
                    };
                })
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [data]);

    return (
        <DataContext.Provider value={{
            data,
            setData,
            currentTurn,
            dataBots, setDataBots,

            loadFromStorage,
            saveToStorage,
            restartGame,
            addGems,
            decreaseGems,
        }}>
            {children}
        </DataContext.Provider>
    );
};
export { DataContextProvider, DataContext, };