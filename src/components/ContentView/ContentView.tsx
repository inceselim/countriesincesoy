//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { colors } from '../../styles/colors';
import { HeaderMenu } from '../HeaderMenu/HeaderMenu';

// create a component
const ContentView = ({ children }: any) => {
    return (
        <View style={{
            backgroundColor: colors.bg,
            flex: 1,
        }}>
            <ImageBackground source={require("../../assets/parchment.png")}
                style={{
                    width: "100%",
                    height: "100%",
                }}>
                {/* <HeaderMenu /> */}
                <SafeAreaView style={{
                    paddingHorizontal: "6%",
                    flex: 1
                }}>
                    {children}
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
};
export default ContentView;
