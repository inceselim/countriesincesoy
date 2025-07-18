import React, { Component, useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/home/HomeScreen';
import GovermentScreen from '../screens/goverment/GovermentScreen';
import ArmyScreen from '../screens/army/ArmyScreen';
import CastleScreen from '../screens/castle/CastleScreen';
import ProductScreen from '../screens/product/ProductScreen';
import { DataContext } from '../context/DataContext';
import DefeatScreen from '../screens/defeatScreen.tsx/DefeatScreen';
import PremiumScreen from '../screens/premium/PremiumScreen';
import WarScreen from '../screens/war/WarScreen';

const Stack = createNativeStackNavigator()
const AppNavigator = () => {
    let { data, setData } = useContext(DataContext);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {
                    !data?.isAlive ?
                        <>
                            <Stack.Screen name="Defeat" component={DefeatScreen} />
                        </>
                        :
                        <>
                            <Stack.Screen name="Home" component={HomeScreen} />
                            <Stack.Screen name="Goverment" component={GovermentScreen} />
                            <Stack.Screen name="Army" component={ArmyScreen} />
                            <Stack.Screen name="Castle" component={CastleScreen} />
                            <Stack.Screen name="Product" component={ProductScreen} />
                            <Stack.Screen name="Premium" component={PremiumScreen} />
                            <Stack.Screen name="War" component={WarScreen} />
                        </>}
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default AppNavigator;
