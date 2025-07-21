import { View, Text, SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import { styles } from '../../styles/styles'
import ButtonSelect from '../../components/ButtonSelect/ButtonSelect'
import { DataContext } from '../../context/DataContext';

export default function DefeatScreen() {
    let { restartGame } = useContext(DataContext);
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