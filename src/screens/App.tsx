import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import AppNavigator from '../navigation/AppNavigator'
import { DataContextProvider } from '../context/DataContext'
import mobileAds from 'react-native-google-mobile-ads';
import { TourGuideProvider } from 'rn-tourguide';

export default function App() {
  useEffect(() => {
    mobileAds().initialize();
  }, []);
  return (
    <DataContextProvider>
      <TourGuideProvider {...{ borderRadius: 16 }}>
        <StatusBar hidden />
        <AppNavigator />
      </TourGuideProvider>
    </DataContextProvider>
  )
}