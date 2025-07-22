import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { DataContext } from '../../context/DataContext';
import { Inter1 } from '../../ads/Inter1';
import { Inter2 } from '../../ads/Inter2';

const VictoryScreen = () => {
    const { setData } = useContext(DataContext);
    Inter1()
    Inter2()
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.overlay}>
                <Text style={styles.title}>🏆 Victory!</Text>
                <Text style={styles.subtitle}>All enemies have been defeated — you and your nation have made history!</Text>

                {/* İsteğe bağlı skor veya istatistikler */}
                {/* <Text style={styles.score}>Toplam Puan: 12345</Text> */}

                <TouchableOpacity style={styles.button} onPress={() => {
                    // navigation.navigate('Home')
                    setData((prevData: any) => ({
                        ...prevData,
                        difficult: 0,
                    }));
                }}>
                    <Text style={styles.buttonText}>Restart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default VictoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 38,
        color: 'gold',
        fontWeight: 'bold',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 24,
    },
    score: {
        fontSize: 16,
        color: '#ccc',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#222',
        fontWeight: '600',
    },
});
