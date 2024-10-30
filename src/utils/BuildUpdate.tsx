import { Alert } from "react-native";
import { build_costs } from "../data/build_costs";

export const BuildUpdate = (type: any, data: any, setData: (data: any) => void) => {
    if (type == "tower") {
        if (data.tower <= 20) {
            if (data.gold >= build_costs.tower.gold) {
                setData((prevData: any) => ({
                    ...prevData,
                    tower: prevData.tower + 1,
                    gold: prevData.gold - build_costs.tower.gold,
                    wood: prevData.wood - build_costs.tower.wood,
                    clay: prevData.clay - build_costs.tower.clay,
                    iron: prevData.iron - build_costs.tower.iron,
                    gems: prevData.gems - build_costs.tower.gems,
                }
                ));
            } else {
                Alert.alert("Gold not enough")
                console.log('Gold değeri yeterli değil.');
            }
        }
        else {
            Alert.alert("Max level")
            console.log('Max level');
        }
    }
    if (type == "castle") {
        if (data.castle <= 20) {
            if (data.gold >= build_costs.castle.gold) {
                setData((prevData: any) => ({
                    ...prevData,
                    castle: prevData.castle + 1,
                    gold: prevData.gold - build_costs.castle.gold,
                    wood: prevData.wood - build_costs.castle.wood,
                    clay: prevData.clay - build_costs.castle.clay,
                    iron: prevData.iron - build_costs.castle.iron,
                    gems: prevData.gems - build_costs.castle.gems,
                }
                ));
            } else {
                Alert.alert("Gold not enough")
                console.log('Gold değeri yeterli değil.');
            }
        }
        else {
            Alert.alert("Max level")
            console.log('Max level');
        }
    }
    if (type == "farm") {
        if (data.gold >= build_costs.farm.gold) {
            setData((prevData: any) => ({
                ...prevData,
                farm: prevData.farm + 1,
                gold: prevData.gold - build_costs.farm.gold,
                wood: prevData.wood - build_costs.farm.wood,
                clay: prevData.clay - build_costs.farm.clay,
                iron: prevData.iron - build_costs.farm.iron,
                gems: prevData.gems - build_costs.farm.gems,
            }
            ));
        } else {
            Alert.alert("Gold not enough")
            console.log('Gold değeri yeterli değil.');
        }
    }
    if (type == "mine") {
        if (data.gold >= build_costs.mine.gold) {
            setData((prevData: any) => ({
                ...prevData,
                mine: prevData.mine + 1,
                gold: prevData.gold - build_costs.mine.gold,
                wood: prevData.wood - build_costs.mine.wood,
                clay: prevData.clay - build_costs.mine.clay,
                iron: prevData.iron - build_costs.mine.iron,
                gems: prevData.gems - build_costs.mine.gems,
            }
            ));
        } else {
            Alert.alert("Gold not enough")
            console.log('Gold değeri yeterli değil.');
        }
    }
    if (type == "brickhouse") {
        if (data.gold >= build_costs.brickhouse.gold) {
            setData((prevData: any) => ({
                ...prevData,
                brickhouse: prevData.brickhouse + 1,
                gold: prevData.gold - build_costs.brickhouse.gold,
                wood: prevData.wood - build_costs.brickhouse.wood,
                clay: prevData.clay - build_costs.brickhouse.clay,
                iron: prevData.iron - build_costs.brickhouse.iron,
                gems: prevData.gems - build_costs.brickhouse.gems,
            }
            ));
        } else {
            Alert.alert("Gold not enough")
            console.log('Gold değeri yeterli değil.');
        }
    }
    if (type == "woodcutter") {
        if (data.gold >= build_costs.woodcutter.gold) {
            setData((prevData: any) => ({
                ...prevData,
                woodcutter: prevData.woodcutter + 1,
                gold: prevData.gold - build_costs.woodcutter.gold,
                wood: prevData.wood - build_costs.woodcutter.wood,
                clay: prevData.clay - build_costs.woodcutter.clay,
                iron: prevData.iron - build_costs.woodcutter.iron,
                gems: prevData.gems - build_costs.woodcutter.gems,
            }
            ));
        } else {
            Alert.alert("Gold not enough")
            console.log('Gold değeri yeterli değil.');
        }
    }
    if (type == "trade_center") {
        if (data.gold >= build_costs.trade_center.gold) {
            setData((prevData: any) => ({
                ...prevData,
                trade_center: prevData.trade_center + 1,
                gold: prevData.gold - build_costs.trade_center.gold,
                wood: prevData.wood - build_costs.trade_center.wood,
                clay: prevData.clay - build_costs.trade_center.clay,
                iron: prevData.iron - build_costs.trade_center.iron,
                gems: prevData.gems - build_costs.trade_center.gems,
            }
            ));
        } else {
            Alert.alert("Gold not enough")
            console.log('Gold değeri yeterli değil.');
        }
    }
    if (type == "avm") {
        if (data.gold >= build_costs.avm.gems) {
            setData((prevData: any) => ({
                ...prevData,
                avm: prevData.avm + 1,
                gold: prevData.gold - build_costs.avm.gold,
                wood: prevData.wood - build_costs.avm.wood,
                clay: prevData.clay - build_costs.avm.clay,
                iron: prevData.iron - build_costs.avm.iron,
                gems: prevData.gems - build_costs.avm.gems,
            }
            ));
        } else {
            Alert.alert("Gold not enough")
            console.log('Gold değeri yeterli değil.');
        }
    }
};
