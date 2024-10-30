//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../styles/colors';

// create a component
export const BottomCard = ({ children }: any) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignSelf: "center",
        paddingHorizontal: 22,
        height: Dimensions.get("window").height / 5,
        alignItems: 'center',
        backgroundColor: colors.bgBottom,
        borderRadius: 12,
    },
});
