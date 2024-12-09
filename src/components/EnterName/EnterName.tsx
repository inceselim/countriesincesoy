//import liraries
import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ImageBackground, TextInput } from 'react-native';
import { DataContext } from '../../context/DataContext';

// create a component
export const EnterName = (props: any) => {
    console.log(props)
    const setValue = props.setValue
    // export const EnterName = (data: any, setData: (data: any) => void, visible: any) => {
    let { data, setData } = useContext(DataContext)
    const [newCountryName, setNewCountryName] = useState("")
    useEffect(() => {
    }, [data])
    const handleUpdate = () => {
        setData((prevData: any) => ({
            ...prevData,
            countryName: newCountryName
        }));
        setValue(false)
    };
    return (
        <ImageBackground source={require("../../assets/images/parchment.png")}
            style={{
                width: "100%",
                height: "100%"
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.titleTxt}>Change Name Country!</Text>
                    <Text style={styles.modalText}>Be Careful!</Text>
                    <TextInput value={newCountryName} onChangeText={setNewCountryName}
                        style={styles.txtInput}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <Pressable
                        style={[styles.button]}
                        onPress={() => handleUpdate()}>
                        <Text style={styles.textStyle}>Change Name</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
    },
    titleTxt: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000"
    },
    txtInput: {
        width: 130,
        marginVertical: 12,
        fontWeight: "700",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 14,
        color: "#08c",
        fontSize:13,
        backgroundColor: "rgba(250,250,250,0.8)"
    },
    button: {
        borderRadius: 8,
        padding: 10,
        backgroundColor: "rgba(250,250,250,1.0)"
    },
    buttonClose: {
        backgroundColor: "rgba(250,250,250,0.9)"
    },
    textStyle: {
        color: '#111',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#111',
    },
});