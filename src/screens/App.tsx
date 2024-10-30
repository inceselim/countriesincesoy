//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { MainNavigation } from '../navigation/MainNavigation';
import {
  TourGuideProvider
} from 'rn-tourguide'
import { I18nextProvider } from 'react-i18next';
import i18n from '../languages/i18n';
import { DataContextProvider } from '../context/DataContext';
// create a component
export const App = () => {
  return (
    <DataContextProvider>
      <TourGuideProvider {...{ borderRadius: 16 }}>
        <I18nextProvider i18n={i18n}>
          <StatusBar hidden />
          <MainNavigation />
        </I18nextProvider>
      </TourGuideProvider>
    </DataContextProvider>
  );
};