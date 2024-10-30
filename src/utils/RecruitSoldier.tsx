import { Alert } from "react-native";
import { soldier_costs } from "../data/soldier_costs";
import { calculateSoldierAmount } from "./CalculateSoldierAmount";

export const RecruitSoldier = (soldierType: any, data: any, setData: (data: any) => void) => {
    if (data.barracks * 50 <= calculateSoldierAmount(data)) {
        console.log("Kışla kapasitesi yetersiz!");
        return data;
    }
    else {
        if (soldierType == "spearman") {
            if (data.gold >= soldier_costs.spearman.gold || data.population >= 1000 || data.wood >= soldier_costs.spearman.wood || data.clay >= soldier_costs.spearman.clay || data.iron >= soldier_costs.spearman.iron) {
                setData((prevData: any) => ({
                    ...prevData,
                    spearman: prevData.spearman + 1,
                    population: prevData.population - soldier_costs.spearman.population,
                    gold: prevData.gold - soldier_costs.spearman.gold,
                    wood: prevData.wood - soldier_costs.spearman.wood,
                    clay: prevData.clay - soldier_costs.spearman.clay,
                    iron: prevData.iron - soldier_costs.spearman.iron,
                }
                ));
            } else {
                Alert.alert("Gold not enough")
                console.log('Gold değeri yeterli değil.');
            }
        }
        if (soldierType == "bowman") {
            if (data.gold >= soldier_costs.bowman.gold || data.pop >= 1000 || data.wood >= soldier_costs.bowman.wood || data.clay >= soldier_costs.bowman.clay || data.iron >= soldier_costs.bowman.iron) {
                setData((prevData: any) => ({
                    ...prevData,
                    bowman: prevData.bowman + 1,
                    population: prevData.population - soldier_costs.bowman.population,
                    gold: prevData.gold - soldier_costs.bowman.gold,
                    wood: prevData.wood - soldier_costs.bowman.wood,
                    clay: prevData.clay - soldier_costs.bowman.clay,
                    iron: prevData.iron - soldier_costs.bowman.iron,
                }
                ));
            } else {
                Alert.alert("Gold not enough")
                console.log('Gold değeri yeterli değil.');
            }
        }
        if (soldierType == "swordman") {
            if (data.gold >= soldier_costs.swordman.gold || data.pop >= 1000 || data.wood >= soldier_costs.swordman.wood || data.clay >= soldier_costs.swordman.clay || data.iron >= soldier_costs.swordman.iron) {
                setData((prevData: any) => ({
                    ...prevData,
                    swordman: prevData.swordman + 1,
                    population: prevData.population - soldier_costs.swordman.population,
                    gold: prevData.gold - soldier_costs.swordman.gold,
                    wood: prevData.wood - soldier_costs.swordman.wood,
                    clay: prevData.clay - soldier_costs.swordman.clay,
                    iron: prevData.iron - soldier_costs.swordman.iron,
                }
                ));
            } else {
                Alert.alert("Gold not enough")
                console.log('Gold değeri yeterli değil.');
            }
        }
        if (soldierType == "axeman") {
            if (data.gold >= soldier_costs.axeman.gold || data.pop >= 1000 || data.wood >= soldier_costs.axeman.wood || data.clay >= soldier_costs.axeman.clay || data.iron >= soldier_costs.axeman.iron) {
                setData((prevData: any) => ({
                    ...prevData,
                    axeman: prevData.axeman + 1,
                    population: prevData.population - soldier_costs.axeman.population,
                    gold: prevData.gold - soldier_costs.axeman.gold,
                    wood: prevData.wood - soldier_costs.axeman.wood,
                    clay: prevData.clay - soldier_costs.axeman.clay,
                    iron: prevData.iron - soldier_costs.axeman.iron,
                }
                ));
            } else {
                Alert.alert("Gold not enough")
                console.log('Gold değeri yeterli değil.');
            }
        }
        if (soldierType == "knight") {
            if (data.gold >= soldier_costs.knight.gold || data.pop >= 1000 || data.wood >= soldier_costs.knight.wood || data.clay >= soldier_costs.knight.clay || data.iron >= soldier_costs.knight.iron) {
                setData((prevData: any) => ({
                    ...prevData,
                    knight: prevData.knight + 1,
                    population: prevData.population - soldier_costs.knight.population,
                    gold: prevData.gold - soldier_costs.knight.gold,
                    wood: prevData.wood - soldier_costs.knight.wood,
                    clay: prevData.clay - soldier_costs.knight.clay,
                    iron: prevData.iron - soldier_costs.knight.iron,
                }
                ));
            } else {
                Alert.alert("Gold not enough")
                console.log('Gold değeri yeterli değil.');
            }
        }
        if (soldierType == "catapult") {
            if (data.gold >= soldier_costs.catapult.gold || data.pop >= 1000 || data.wood >= soldier_costs.catapult.wood || data.clay >= soldier_costs.catapult.clay || data.iron >= soldier_costs.catapult.iron) {
                setData((prevData: any) => ({
                    ...prevData,
                    catapult: prevData.catapult + 1,
                    population: prevData.population - soldier_costs.catapult.population,
                    gold: prevData.gold - soldier_costs.catapult.gold,
                    wood: prevData.wood - soldier_costs.catapult.wood,
                    clay: prevData.clay - soldier_costs.catapult.clay,
                    iron: prevData.iron - soldier_costs.catapult.iron,
                }
                ));
            } else {
                Alert.alert("Gold not enough")
                console.log('Gold değeri yeterli değil.');
            }
        }
    }
};
