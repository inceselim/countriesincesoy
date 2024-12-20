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
                //PlaySoundGecis()
                setTimeout(() => {
                    navigation.goBack()
                }, 0.2 * 1000);
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
