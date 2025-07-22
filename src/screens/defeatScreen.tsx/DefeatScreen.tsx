import { View, Text, SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import { styles } from '../../styles/styles'
import ButtonSelect from '../../components/ButtonSelect/ButtonSelect'
import { DataContext } from '../../context/DataContext';
import { Inter1 } from '../../ads/Inter1';
import { Inter2 } from '../../ads/Inter2';

export default function DefeatScreen() {
    let { restartGame } = useContext(DataContext);
    Inter1()
    Inter2()
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: 35,
                        textAlign: "center",
                        color: "#a33",
                        fontWeight: "600",
                        marginBottom: 12
                    }}>☠️</Text>
                    <Text style={{
                        fontSize: 35,
                        textAlign: "center",
                        color: "#a33",
                        fontWeight: "600",
                        marginBottom: 12
                    }}>😔 You are defeated 😔</Text>
                    <Text style={{
                        fontSize: 17,
                        textAlign: "center",
                        color: "#ddd",
                        fontWeight: "600",
                        marginTop: 22,
                        marginBottom: 12
                    }}>You should try again...</Text>
                    <ButtonSelect text={"Restart"}
                        onPress={() => { restartGame() }} />
                </View>
            </View>
        </SafeAreaView>
    )
}