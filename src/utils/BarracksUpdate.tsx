import { Alert } from "react-native";

export const BarracksUpdate = (data: any, setData: (data: any) => void) => {
    // Eğer gold 200 veya daha fazlaysa
    if (data.gold >= 100) {
        setData((prevData: any) => ({
            ...prevData,
            barracks: prevData.barracks + 1,  // Parliament değerini artır
            gold: prevData.gold - 100            // Gold değerini 200 azalt
        }
        ));
    } else {
        Alert.alert("Gold not enough")
        console.log('Gold değeri yeterli değil.');
    }
};
