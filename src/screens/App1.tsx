//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

// create a component
export const App = () => {
  const defaultData: any = {
    turn: 1,
    language: "en",
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
  const [data, setData] = React.useState<any>(defaultData);
  const updateData = (s: number) => {
    setData((prevGameData: any) => {
      // bots dizisinin bir kopyasını oluştur
      const updatedBots = [...prevGameData.bots];
      // Verilen indeksteki axeman değerini artır
      updatedBots[s].mine += 1;
      // Güncellenmiş bots dizisiyle state'i güncelle
      return {
        ...prevGameData,
        bots: updatedBots,
      };
    });
    console.log("eklendi MINE: ", data.bots[s].mine)
  }
  return (
    <View style={styles.container}>
      <Text>App</Text>
      <Pressable onPress={() => updateData(0)}>
        <Text style={{
          color: "white",
          fontSize: 16,
          margin: 22
        }}>1data: {data.bots[0].mine}</Text>
      </Pressable>
      <Pressable onPress={() => updateData(1)}>
        <Text style={{
          color: "white",
          fontSize: 16,
          margin: 22
        }}>2data: {data.bots[1].mine}</Text>
      </Pressable>

    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});