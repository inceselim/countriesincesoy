//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';

// create a component
export const HomeCard = ({ children, onPress }: any) => {
    return (
        <TouchableHighlight onPress={onPress}>
            <View style={styles.container}>
                {children}
            </View>
        </TouchableHighlight>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("screen").height / 3 - 30,
        width: Dimensions.get("screen").width / 6 - 40,
        borderRadius: 8,
        marginHorizontal: "1%",
        marginVertical: "2%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#04364A',
    },
});
