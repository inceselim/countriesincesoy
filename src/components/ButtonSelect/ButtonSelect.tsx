//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';
import { styles } from '../../styles/styles';

// create a component
const ButtonSelect = ({ onPress, text = "Select", disabled = false }: any) => {
    return (
        <TouchableOpacity style={{
            backgroundColor: colors.kavunKoyu,
            borderRadius: 8,
            paddingHorizontal: 24,
            paddingVertical: 3,
            opacity: disabled ? 0.52 : 1
        }}
            disabled={disabled}
            onPress={onPress}>
            <Text style={[styles.txtDarkBold, {
                // paddingHorizontal: 12,
                paddingVertical: 6
            }]}>{text}</Text>
        </TouchableOpacity>
    );
};
export default ButtonSelect;
