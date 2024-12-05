//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';

// create a component
export const App = () => {
    return (
        <SafeAreaView>
            <View>
                <Pressable onPress={()=>{
                    
                }}>
                    <Text>App</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};