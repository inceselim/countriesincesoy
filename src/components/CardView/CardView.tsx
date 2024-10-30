//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

// create a component
const CardView = ({ children }: any) => {
    return (
        <View style={{
            flexDirection: "row",
            marginVertical: 3,
            alignItems: "center",
            backgroundColor: colors.kavun,
            marginHorizontal: 12,
            borderRadius: 12,
            paddingHorizontal: 6,
            paddingVertical: 3,
            borderWidth: 2,
            // justifyContent: "center"
        }}>
            {children}
        </View>
    );
};
export default CardView;
