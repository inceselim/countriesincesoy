//import liraries
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

// create a component
const ButtonClose = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                // PlaySoundGecis()
                navigation.goBack()
            }}>
            <Image source={require("../../assets/images/close128.png")}
                style={{
                    height: 40,
                    width: 40
                }} />
        </TouchableOpacity>
    );
};
export default ButtonClose;
