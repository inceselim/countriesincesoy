//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { PlaySoundGecis } from '../../utils/PlaySoundGecis';

// create a component
const ButtonClose = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack()
                PlaySoundGecis()
            }}>
            <Image source={require("../../assets/images/close128.png")}
                style={{
                    height: 40,
                    width: 40
                }} />
        </TouchableOpacity>
    );
};
export default ButtonClose;
