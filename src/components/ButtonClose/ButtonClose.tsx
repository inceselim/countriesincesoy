//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// create a component
const ButtonClose = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image source={require("../../assets/close128.png")}
                style={{
                    height: 40,
                    width: 40
                }} />
        </TouchableOpacity>
    );
};
export default ButtonClose;
