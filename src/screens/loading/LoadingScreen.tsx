//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ContentView from '../../components/ContentView/ContentView';
import { styles } from '../../styles/styles';

// create a component
const LoadingScreen = () => {
    return (
        <ContentView>
            <Text style={{
                textAlign: "center",
                fontSize: 33
            }}>LoadingScreen</Text>
        </ContentView>
    );
};
export default LoadingScreen;
