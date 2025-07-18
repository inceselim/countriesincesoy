import { Alert } from "react-native";
import { ArmyMaintenanceClay, ArmyMaintenanceGold, ArmyMaintenanceIron, ArmyMaintenanceWood } from "../service/ArmyMaintenance";
import { BuildMaintenanceClay, BuildMaintenanceGold, BuildMaintenanceIron, BuildMaintenanceWood, } from "../service/BuildMaintenance";
import { CalculatePopulation } from "../service/CalculatePopulation";
import { build_income } from "../data/build_income";
import { CalculateInterest } from "./CalculateTax";
import { BotsEndTurn } from "./BotsEndTurn";

export const EndTurn = (data: any, setData: (data: any) => void, setLoading: any) => {
    setLoading(true)
    let parliamentPerformance = data.population < (data.parliament * 1000) ? 1 : (100 - 5 * ((data.population - (data.parliament * 1000)) / 100)) / 100

    let taxIncome = CalculateInterest(data.population)
    let buildIncomeGold = ((build_income.mine.gold * data.mine) + (build_income.woodcutter.gold * data.woodcutter) + (build_income.brickhouse.gold * data.brickhouse) + (build_income.trade_center.gold * data.trade_center) + (build_income.avm.gold * data.avm))
    let buildIncomeWood: number = ((build_income.woodcutter.wood * data.woodcutter) + (build_income.avm.wood * data.avm))
    let buildIncomeClay: number = ((build_income.brickhouse.clay * data.brickhouse) + (build_income.avm.clay * data.avm))
    let buildIncomeIron: number = ((build_income.woodcutter.wood * data.woodcutter) + (build_income.avm.wood * data.avm))

    let buildMaintenanceGold = BuildMaintenanceGold(data)
    let buildMaintenanceWood = BuildMaintenanceWood(data)
    let buildMaintenanceClay = BuildMaintenanceClay(data)
    let buildMaintenanceIron = BuildMaintenanceIron(data)

    let armyMaintenanceGold = ArmyMaintenanceGold(data)
    let armyMaintenanceWood = ArmyMaintenanceWood(data)
    let armyMaintenanceClay = ArmyMaintenanceClay(data)
    let armyMaintenanceIron = ArmyMaintenanceIron(data)


    data.prevInflation = data.inflation
    let interest = 0;
    function calculateInterest() {
        if (data.gold < 1000) {
            interest = 0; // 1000 altından azsa faiz yok
        }

        let thousandBlocks = Math.floor(data.gold / 1000);  // Her 1000 altın için bir blok
        interest = thousandBlocks * 5;  // Her blok için 5 altın faiz geliri
        return interest;
    }
    function calculateInflation() {
        let inflationRate = 1; // Enflasyon başlangıç değeri
        if (data.gold > 50000) {
            let extraAltin = data.gold - 10000;  // 10000 üstündeki altın miktarı
            let decrementFactor = Math.floor(extraAltin / 100);  // Her 100 altın için
            inflationRate -= Number((decrementFactor * 0.1).toFixed(2));  // %10 enflasyon azalır
            inflationRate = Number(inflationRate.toFixed(2));
        }

        // Enflasyon oranı sıfırın altına düşmemesi için kontrol
        if (inflationRate < 0) {
            inflationRate = 0;
        }
        if (data.prevInflation > inflationRate) {
            // Alert.alert("Enflasyonda artış")
        }
        return Math.round(inflationRate);
    }

    function polityGoldEffects() {
        // Polities
        //Monarchy,Aristocracy,Theocracy,Dictator,Democracy
        if (data.polity == "premium") {
            return 1;
        }
        else if (data.polity == "Democracy") {
            return 0
        }
        else if (data.polity == "Dictator") {
            return 0
        }
        else if (data.polity == "Theocracy") {
            return 0
        }
        else if (data.polity == "Aristocracy") {
            return 0.1
        }
        else if (data.polity == "Monarchy") {
            return -0.2
        }
        else {
            // Eğer bulunamazsa veya `population` yoksa, false döndür
            return 0;
        }
    }
    const polityGoldBonus = polityGoldEffects();
    calculateInterest()
    let inflationRate: number = calculateInflation()
    CalculatePopulation(data, setData)
    let countryFocusBonusGold = data.countryFocus == "income" ? 0.1 :
        data.countryFocus == "premium" ? 1 : 0

    let baseIncome: number = Math.round((taxIncome + interest + buildIncomeGold))
    let income: number = Math.round(((baseIncome + Math.ceil(baseIncome * polityGoldBonus) + Math.ceil(baseIncome * countryFocusBonusGold) * parliamentPerformance) * inflationRate))


    setData((prevData: any) => ({
        ...prevData,
        inflation: inflationRate,
        income: income - (buildMaintenanceGold + armyMaintenanceGold),
        gold: Math.round(prevData.gold + (income - (buildMaintenanceGold + armyMaintenanceGold))),
        wood: prevData.wood + Math.round(buildIncomeWood - (buildMaintenanceWood + armyMaintenanceWood)),
        clay: prevData.clay + Math.round(buildIncomeClay - (buildMaintenanceClay + armyMaintenanceClay)),
        iron: prevData.wood + Math.round(buildIncomeIron - (buildMaintenanceIron + armyMaintenanceIron)),
        turn: prevData.turn + 1,
    }
    ));

    // setData((prevData: any) => ({
    //     ...prevData,
    //     turn: prevData.turn + 1,
    // }
    // ));
    setTimeout(() => {
        setLoading(false)
    }, 1 * 1);
};
