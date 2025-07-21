import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VictoryScreen = () => {
    const navigation: any = useNavigation();

    return (
        <ImageBackground
            source={require('../../assets/victory_bg.jpg')}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>🏆 Zafer!</Text>
                <Text style={styles.subtitle}>Tüm düşmanları yendin, ülkenle tarihe geçtin!</Text>

                {/* İsteğe bağlı skor veya istatistikler */}
                {/* <Text style={styles.score}>Toplam Puan: 12345</Text> */}

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Restary</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
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
