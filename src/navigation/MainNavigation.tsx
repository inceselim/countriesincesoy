import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import GovermentScreen from '../screens/goverment/GovermentScreen';
import ArmyScreen from '../screens/army/ArmyScreen';
import CastleScreen from '../screens/castle/CastleScreen';
import ProductScreen from '../screens/product/ProductScreen';
import { FinanceScreen } from '../screens/finance/FinanceScreen';
import { BuyGemsScreen } from '../screens/buyGems/BuyGemsScreen';
import { MarketScreen } from '../screens/market/MarketScreen';
import { StatisticScreen } from '../screens/statistic/StatisticSreen';

const Stack = createNativeStackNavigator();

export function MainNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name='Goverment' component={GovermentScreen} />
                <Stack.Screen name='Army' component={ArmyScreen} />
                <Stack.Screen name='Castle' component={CastleScreen} />
                <Stack.Screen name='Product' component={ProductScreen} />
                <Stack.Screen name='Finance' component={FinanceScreen} />
                <Stack.Screen name='BuyGems' component={BuyGemsScreen} />
                <Stack.Screen name='Market' component={MarketScreen} />
                <Stack.Screen name='Statistic' component={StatisticScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}