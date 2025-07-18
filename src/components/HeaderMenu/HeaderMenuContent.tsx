//import liraries
import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from '../../styles/styles';
import ButtonClose from '../ButtonClose/ButtonClose';
import { colors } from '../../styles/colors';
import { DataContext } from '../../context/DataContext';
import { formatShowNumber } from '../../utils/FormatShowNumbers';
import { calculateTurnIncome } from '../../service/turnIncome';

// create a component
const HeaderMenuContent = ({ title }: any) => {
    const { data, setData, currentTurn, } = useContext(DataContext)
    const turnIncome = calculateTurnIncome(data);
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: colors.white,
            marginBottom: 12,
            paddingBottom: 6
        }}>
            {/* <Text style={[styles.txtDarkTitle, { marginStart: 12 }]}>{title}</Text> */}
            <View style={{
                flexDirection: "row"
            }}>
                <Text style={[styles.txtDarkBold, { paddingEnd: 12 }]}>🫂 {formatShowNumber(data.farm * 1000) + " / " + formatShowNumber(data.population)} {"("}{data.population - data.prevPopulation + ")"}</Text>
                <Text style={[styles.txtDarkBold, { paddingStart: 12 }]}>🪵 {data.wood} {"(+" + turnIncome.wood + ")"}</Text>
                <Text style={[styles.txtDarkBold, { paddingStart: 12 }]}>🧱 {data.clay} {"(+" + turnIncome.clay + ")"}</Text>
                <Text style={[styles.txtDarkBold, { paddingStart: 12 }]}>🪨 {data.iron} {"(+" + turnIncome.iron + ")"}</Text>
                <Text style={[styles.txtDarkBold, { paddingEnd: 12, }]}>💎 {data.gems}</Text>
                <Text style={styles.txtDarkBold}>💰 {data.gold} {"(+" + turnIncome.gold + ")"}</Text>
            </View>
            <ButtonClose />
        </View>
    );
};
export default HeaderMenuContent;
