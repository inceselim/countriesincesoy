//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';

// create a component
export const PlaySoundGecis = () => {
    Sound.setCategory('Playback');
    var whoosh = new Sound('arrow.wav', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        // Play the sound with an onEnd callback
        whoosh.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });
    });
    whoosh.setVolume(1.0)
};
