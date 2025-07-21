import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CalculatePopBot, CalculatePopPlayer } from '../service/population';
import { calculateTurnIncome } from '../service/turnIncome';
import { botBuildDecision } from '../service/BotBuildDecision';
import { botRecruitSoldier } from '../service/BotRecruitSoldier';
import { botAttackDecision } from '../service/BotAttackDecision';
import { Alert } from 'react-native';
import { calculateBotAttackPower, calculateBotDefencePower } from '../service/CalculatePlayerPower';
import { botAttacksPlayerRandomly } from '../service/BotAttackPlayer';

const DataContext = createContext<any>(undefined);
interface DataContextProviderProps {
    children: ReactNode;
}
const DataContextProvider: React.FC<DataContextProviderProps> = ({ children }: any) => {
    const [currentTurn, setCurrentTurn] = useState(0)
    const [dataBots, setDataBots] = useState<any[]>([]);
    const defaultData: any = {
        turn: 1,
        language: "en",
        difficult: "0",
        isAlive: true,
        isTutorial: false,
        news: [],
        canDeclareWar: false,
        countryName: "",
        countryFocus: "pop",
        polity: "Democracy",
        population: 3500,
        prevPopulation: 3500,
        taxRate: 10,
        taxGoldPerTurn: 13,
        populationGrowthRate: 0.0044,
        gems: 0,
        gold: 1800,
        wood: 500,
        clay: 400,
        iron: 300,
        income: 0,
        prevInflation: 1,
        inflation: 1,
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
        spearman: 10,
        bowman: 10,
        swordman: 5,
        axeman: 5,
        knight: 44,
        catapult: 2,
    }
    const [data, setData] = useState<any>(defaultData);

    const restartGame = async () => {
        setData(defaultData)
        setCurrentTurn(0)
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
        try {
            const value = await AsyncStorage.getItem('@currentTurn');
            if (value !== null) {
                setCurrentTurn(JSON.parse(value));
            }
        } catch (e) {
            console.error('Hata:', e);
        }
    };

    const saveToStorage = async (value: string, bots: any, currentTurn: any) => {
        try {
            await AsyncStorage.setItem('@data', JSON.stringify(value));
            await AsyncStorage.setItem('@dataBots', JSON.stringify(bots));
            await AsyncStorage.setItem('@currentTurn', JSON.stringify(currentTurn));
        } catch (e) {
            console.error('Hata:', e);
        }
    };

    useEffect(() => {
        if (data?.difficult == 0 || data?.isTutorial == true) return;

        const interval = setInterval(() => {
            setCurrentTurn((prev) => prev + 1);

            // Oyuncu kaynak/nüfus
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

            // Botlar
            setDataBots((prevBots: any[]) =>
                prevBots.map((bot: any, idx: number, arr: any[]) => {
                    if (!bot.isAlive) return bot;

                    const income = calculateTurnIncome(bot);
                    let updatedBot = {
                        ...bot,
                        gold: bot.gold + income.gold,
                        wood: bot.wood + income.wood,
                        clay: bot.clay + income.clay,
                        iron: bot.iron + income.iron,
                        prevPopulation: bot.population,
                        population: CalculatePopBot(bot)
                    };

                    // Diğer işlemler (build, recruit, vs...)
                    const build = botBuildDecision(updatedBot);
                    if (build) updatedBot[build] = (updatedBot[build] || 0) + 1;

                    const recruit = botRecruitSoldier(updatedBot);
                    if (recruit) updatedBot[recruit.type] = (updatedBot[recruit.type] || 0) + recruit.amount;

                    // 🛡 Oyuncuya saldırı denemesi
                    botAttacksPlayerRandomly(updatedBot, data, setData);

                    return updatedBot;
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
export { DataContextProvider, DataContext };
