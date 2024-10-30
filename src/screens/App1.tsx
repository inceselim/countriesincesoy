//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
export const App = () => {
    const [value, setValue] = useState("sfsd")
    const [value1, setValue1] = useState(3)
    const [value2, setValue2] = useState(
        [
            {
                userName: "selim",
                age: 33
            },
            {
                userName: "esra",
                year: 2,
            },
        ]
    )
    const [value3, setValue3] = useState(
        ["BMW", "Audi", "Mercedes", "Renault", "Fiat"]
    )
    const [selectedCar, setSelectedCar] = useState("")
    return (
        <View style={{
            flex: 1,
            backgroundColor: "#af1",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text style={{
                fontSize: 22,
                fontWeight: "bold"
            }}>1. Object: {value2[0].age}</Text>
            <Text style={{
                fontSize: 22,
                fontWeight: "bold"
            }}>Arabalar: {selectedCar == "" ? "Araba Seçilmedi" : selectedCar}</Text>
            {
                value3.map((i: any, index) => {
                    console.log(index)
                    return (
                        <TouchableOpacity onPress={() => setSelectedCar(i)}>
                            <Text key={i}
                                style={{
                                    fontSize: 14,
                                    paddingHorizontal: 12,
                                    marginVertical: 6,
                                    backgroundColor: "#344",
                                    color: "#eee",
                                    fontWeight: "700",
                                    paddingBottom: 21
                                }}>{i}</Text>
                        </TouchableOpacity>
                    )
                })
            }
            <TouchableOpacity onPress={() => setSelectedCar("")}>
                <Text
                    style={{
                        fontSize: 14,
                        paddingHorizontal: 12,
                        marginVertical: 6,
                        backgroundColor: "#344",
                        color: "#eee",
                        fontWeight: "700",
                        paddingBottom: 21
                    }}>Arabayı sil</Text>
            </TouchableOpacity>
        </View>
    );
};
