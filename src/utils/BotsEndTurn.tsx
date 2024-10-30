import { build_income } from "../data/build_income"
import { ArmyMaintenanceGold, ArmyMaintenanceWood, ArmyMaintenanceClay, ArmyMaintenanceIron } from "./ArmyMaintenance"
import { BuildMaintenanceGold, BuildMaintenanceWood, BuildMaintenanceClay, BuildMaintenanceIron } from "./BuildMaintenance"
import { CalculateInterest } from "./CalculateTax"
import { CalculatePopBot } from "./CalculatePopBot"
import { BotBuildDecision } from "./BotBuildDecision"
import { build_costs } from "../data/build_costs"
import { calculateSoldierAmount } from "./CalculateSoldierAmount"


export const BotsEndTurn = async (bot: any, index: number, data: any, setData: (data: any) => void) => {
    console.log("BotsEndTurn")
    console.log("",)
    console.log("",)
    console.log("BotsEndTurn index: ", data.bots[index].countryName)
    let parliamentPerformance = data.bots[index].population < (data.bots[index].parliament * 1000) ? 1 : (100 - 5 * ((data.bots[index].population - (data.bots[index].parliament * 1000)) / 100)) / 100

    let taxIncome = CalculateInterest(data.bots[index].population)
    let buildIncomeGold = ((build_income.mine.gold * data.bots[index].mine) + (build_income.woodcutter.gold * data.bots[index].woodcutter) + (build_income.brickhouse.gold * data.bots[index].brickhouse) + (build_income.trade_center.gold * data.bots[index].trade_center) + (build_income.avm.gold * data.bots[index].avm))
    let buildIncomeWood: number = ((build_income.woodcutter.wood * data.bots[index].woodcutter) + (build_income.avm.wood * data.bots[index].avm))
    let buildIncomeClay: number = ((build_income.brickhouse.clay * data.bots[index].brickhouse) + (build_income.avm.clay * data.bots[index].avm))
    let buildIncomeIron: number = ((build_income.mine.iron * data.bots[index].mine) + (build_income.avm.iron * data.bots[index].avm))

    let buildMaintenanceGold = BuildMaintenanceGold(data.bots[index])
    let buildMaintenanceWood = BuildMaintenanceWood(data.bots[index])
    let buildMaintenanceClay = BuildMaintenanceClay(data.bots[index])
    let buildMaintenanceIron = BuildMaintenanceIron(data.bots[index])

    let armyMaintenanceGold = ArmyMaintenanceGold(data.bots[index])
    let armyMaintenanceWood = ArmyMaintenanceWood(data.bots[index])
    let armyMaintenanceClay = ArmyMaintenanceClay(data.bots[index])
    let armyMaintenanceIron = ArmyMaintenanceIron(data.bots[index])

    data.prevInflation = data.inflation
    let interest = 0;
    function calculateInterest() {
        if (data.bots[index].gold < 1000) {
            interest = 0; // 1000 altından azsa faiz yok
        }

        let thousandBlocks = Math.floor(data.bots[index].gold / 1000);  // Her 1000 altın için bir blok
        interest = thousandBlocks * 5;  // Her blok için 5 altın faiz geliri
        return interest;
    }
    function calculateInflation() {
        let inflationRate = 1; // Enflasyon başlangıç değeri
        if (data.bots[index].gold > 10000) {
            let extraAltin = data.bots[index].gold - 10000;  // 10000 üstündeki altın miktarı
            let decrementFactor = Math.floor(extraAltin / 100);  // Her 100 altın için
            inflationRate -= Number((decrementFactor * 0.1).toFixed(2));  // %10 enflasyon azalır
            inflationRate = Number(inflationRate.toFixed(2));
            console.log("inflationRate: ", inflationRate)
        }

        // Enflasyon oranı sıfırın altına düşmemesi için kontrol
        if (inflationRate < 0) {
            inflationRate = 0;
        }
        return Math.round(inflationRate);
    }

    function polityGoldEffects() {
        // Polities
        //Monarchy,Aristocracy,Theocracy,Dictator,Democracy
        if (data.bots[index].polity == "premium") {
            return 1;
        }
        else if (data.bots[index].polity == "Democracy") {
            return 0
        }
        else if (data.bots[index].polity == "Dictator") {
            return 0
        }
        else if (data.bots[index].polity == "Theocracy") {
            return 0
        }
        else if (data.bots[index].polity == "Aristocracy") {
            return 0.1
        }
        else if (data.bots[index].polity == "Monarchy") {
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
    let resultPopulation: number = CalculatePopBot(data.bots[index])
    let countryFocusBonusGold = data.bots[index].countryFocus == "income" ? 0.1 :
        data.countryFocus == "premium" ? 1 : 0

    let baseIncome: number = Math.round(taxIncome + interest + buildIncomeGold)
    let income: number = Math.round(((baseIncome + Math.ceil(baseIncome * polityGoldBonus) + Math.ceil(baseIncome * countryFocusBonusGold) * parliamentPerformance) * inflationRate))

    let kararlar: any = BotBuildDecision(data, data.bots[index], index, setData)
    console.log("KARARLAR")
    console.log("KARARLAR")
    console.log("KARARLAR: ", kararlar)
    console.log("KARARLAR")
    console.log("KARARLAR")
    if (kararlar?.buildings?.length > 0) {
        if (kararlar?.buildings?.includes("parliament")) {
            if (build_costs.parliament.gold <= data.bots[index].gold &&
                build_costs.parliament.wood <= data.bots[index].wood &&
                build_costs.parliament.clay <= data.bots[index].clay &&
                build_costs.parliament.iron <= data.bots[index].iron
            ) {
                setData((prevData: any) => {
                    // Önce botların eski halini al
                    const updatedBots = [...prevData.bots];
                    // index'teki botu güncelle
                    updatedBots[index] = {
                        ...updatedBots[index],
                        parliament: updatedBots[index].parliament + 1,
                        gold: Math.round(updatedBots[index].gold - build_costs.parliament.gold),
                        wood: Math.round(updatedBots[index].wood - build_costs.parliament.wood),
                        clay: Math.round(updatedBots[index].clay - build_costs.parliament.clay),
                        iron: Math.round(updatedBots[index].iron - build_costs.parliament.iron),
                    };
                    // Güncellenmiş botları geri döndür
                    return {
                        ...prevData,
                        bots: updatedBots,
                    };
                });
            }
        }
        if (kararlar?.buildings?.includes("farm")) {
            if (build_costs.farm.gold <= data.bots[index].gold &&
                build_costs.farm.wood <= data.bots[index].wood &&
                build_costs.farm.clay <= data.bots[index].clay &&
                build_costs.farm.iron <= data.bots[index].iron
            ) {
                setData((prevData: any) => {
                    // Önce botların eski halini al
                    const updatedBots = [...prevData.bots];
                    // index'teki botu güncelle
                    updatedBots[index] = {
                        ...updatedBots[index],
                        farm: prevData.farm + 1,
                        gold: Math.round(updatedBots[index].gold - build_costs.farm.gold),
                        wood: Math.round(updatedBots[index].wood - build_costs.farm.wood),
                        clay: Math.round(updatedBots[index].clay - build_costs.farm.clay),
                        iron: Math.round(updatedBots[index].wood - build_costs.farm.iron),
                    };
                    // Güncellenmiş botları geri döndür
                    return {
                        ...prevData,
                        bots: updatedBots,
                    };
                });
            }
        }
        if (kararlar?.buildings?.includes("woodcutter")) {
            if (build_costs.woodcutter.gold <= data.bots[index].gold &&
                build_costs.woodcutter.wood <= data.bots[index].wood &&
                build_costs.woodcutter.clay <= data.bots[index].clay &&
                build_costs.woodcutter.iron <= data.bots[index].iron
            ) {
                setData((prevData: any) => {
                    // Önce botların eski halini al
                    const updatedBots = [...prevData.bots];
                    // index'teki botu güncelle
                    updatedBots[index] = {
                        ...updatedBots[index],
                        woodcutter: updatedBots[index].woodcutter + 1,
                        gold: Math.round(updatedBots[index].gold - build_costs.woodcutter.gold),
                        wood: Math.round(updatedBots[index].wood - build_costs.woodcutter.wood),
                        clay: Math.round(updatedBots[index].clay - build_costs.woodcutter.clay),
                        iron: Math.round(updatedBots[index].iron - build_costs.woodcutter.iron),
                    };
                    // Güncellenmiş botları geri döndür
                    return {
                        ...prevData,
                        bots: updatedBots,
                    };
                });
            }
        }
        if (kararlar?.buildings?.includes("brickhouse")) {
            if (build_costs.brickhouse.gold <= data.bots[index].gold &&
                build_costs.brickhouse.wood <= data.bots[index].wood &&
                build_costs.brickhouse.clay <= data.bots[index].clay &&
                build_costs.brickhouse.iron <= data.bots[index].iron
            ) {
                setData((prevData: any) => {
                    // Önce botların eski halini al
                    const updatedBots = [...prevData.bots];
                    // index'teki botu güncelle
                    updatedBots[index] = {
                        ...updatedBots[index],
                        brickhouse: updatedBots[index].brickhouse + 1,
                        gold: Math.round(updatedBots[index].gold - build_costs.brickhouse.gold),
                        wood: Math.round(updatedBots[index].wood - build_costs.brickhouse.wood),
                        clay: Math.round(updatedBots[index].clay - build_costs.brickhouse.clay),
                        iron: Math.round(updatedBots[index].iron - build_costs.brickhouse.iron),
                    };
                    // Güncellenmiş botları geri döndür
                    return {
                        ...prevData,
                        bots: updatedBots,
                    };
                });
            }
        }
        if (kararlar?.buildings?.includes("mine")) {
            if (build_costs.mine.gold <= data.bots[index].gold &&
                build_costs.mine.wood <= data.bots[index].wood &&
                build_costs.mine.clay <= data.bots[index].clay &&
                build_costs.mine.iron <= data.bots[index].iron
            ) {
                setData((prevData: any) => {
                    // Önce botların eski halini al
                    const updatedBots = [...prevData.bots];
                    // index'teki botu güncelle
                    updatedBots[index] = {
                        ...updatedBots[index],
                        mine: updatedBots[index].mine + 1,
                        gold: Math.round(updatedBots[index].gold - build_costs.mine.gold),
                        wood: Math.round(updatedBots[index].wood - build_costs.mine.wood),
                        clay: Math.round(updatedBots[index].clay - build_costs.mine.clay),
                        iron: Math.round(updatedBots[index].iron - build_costs.mine.iron),
                    };
                    // Güncellenmiş botları geri döndür
                    return {
                        ...prevData,
                        bots: updatedBots,
                    };
                });
            }
        }
        if (kararlar?.buildings?.includes("trade_center")) {
            if (build_costs.trade_center.gold <= data.bots[index].gold &&
                build_costs.trade_center.wood <= data.bots[index].wood &&
                build_costs.trade_center.clay <= data.bots[index].clay &&
                build_costs.trade_center.iron <= data.bots[index].iron
            ) {
                setData((prevData: any) => {
                    // Önce botların eski halini al
                    const updatedBots = [...prevData.bots];
                    // index'teki botu güncelle
                    updatedBots[index] = {
                        ...updatedBots[index],
                        trade_center: updatedBots[index].trade_center + 1,
                        gold: Math.round(updatedBots[index].gold - build_costs.trade_center.gold),
                        wood: Math.round(updatedBots[index].wood - build_costs.trade_center.wood),
                        clay: Math.round(updatedBots[index].clay - build_costs.trade_center.clay),
                        iron: Math.round(updatedBots[index].iron - build_costs.trade_center.iron),
                    };
                    // Güncellenmiş botları geri döndür
                    return {
                        ...prevData,
                        bots: updatedBots,
                    };
                });
            }
        }
        if (kararlar?.buildings?.includes("barracks")) {
            if (build_costs.barracks.gold <= data.bots[index].gold &&
                build_costs.barracks.wood <= data.bots[index].wood &&
                build_costs.barracks.clay <= data.bots[index].clay &&
                build_costs.barracks.iron <= data.bots[index].iron
            ) {
                setData((prevData: any) => {
                    // Önce botların eski halini al
                    const updatedBots = [...prevData.bots];
                    // index'teki botu güncelle
                    updatedBots[index] = {
                        ...updatedBots[index],
                        barracks: updatedBots[index].barracks + 1,
                        gold: Math.round(updatedBots[index].gold - build_costs.barracks.gold),
                        wood: Math.round(updatedBots[index].wood - build_costs.barracks.wood),
                        clay: Math.round(updatedBots[index].clay - build_costs.barracks.clay),
                        iron: Math.round(updatedBots[index].iron - build_costs.barracks.iron),
                    };
                    // Güncellenmiş botları geri döndür
                    return {
                        ...prevData,
                        bots: updatedBots,
                    };
                });
            }
        }
        if (kararlar?.buildings?.includes("castle")) {
            if (build_costs.castle.gold <= data.bots[index].gold &&
                build_costs.castle.wood <= data.bots[index].wood &&
                build_costs.castle.clay <= data.bots[index].clay &&
                build_costs.castle.iron <= data.bots[index].iron
            ) {
                setData((prevData: any) => {
                    // Önce botların eski halini al
                    const updatedBots = [...prevData.bots];
                    // index'teki botu güncelle
                    updatedBots[index] = {
                        ...updatedBots[index],
                        castle: updatedBots[index].castle + 1,
                        gold: Math.round(updatedBots[index].gold - build_costs.castle.gold),
                        wood: Math.round(updatedBots[index].wood - build_costs.castle.wood),
                        clay: Math.round(updatedBots[index].clay - build_costs.castle.clay),
                        iron: Math.round(updatedBots[index].iron - build_costs.castle.iron),
                    };
                    // Güncellenmiş botları geri döndür
                    return {
                        ...prevData,
                        bots: updatedBots,
                    };
                });
            }
        }
        if (kararlar?.buildings?.includes("tower")) {
            if (build_costs.tower.gold <= data.bots[index].gold &&
                build_costs.tower.wood <= data.bots[index].wood &&
                build_costs.tower.clay <= data.bots[index].clay &&
                build_costs.tower.iron <= data.bots[index].iron
            ) {
                setData((prevData: any) => {
                    // Önce botların eski halini al
                    const updatedBots = [...prevData.bots];
                    // index'teki botu güncelle
                    updatedBots[index] = {
                        ...updatedBots[index],
                        tower: updatedBots[index].tower + 1,
                        gold: Math.round(updatedBots[index].gold - build_costs.tower.gold),
                        wood: Math.round(updatedBots[index].wood - build_costs.tower.wood),
                        clay: Math.round(updatedBots[index].clay - build_costs.tower.clay),
                        iron: Math.round(updatedBots[index].iron - build_costs.tower.iron),
                    };
                    // Güncellenmiş botları geri döndür
                    return {
                        ...prevData,
                        bots: updatedBots,
                    };
                });
            }
        }
        if (kararlar?.buildings?.includes("espionage")) {
            if (build_costs.espionage.gold <= data.bots[index].gold &&
                build_costs.espionage.wood <= data.bots[index].wood &&
                build_costs.espionage.clay <= data.bots[index].clay &&
                build_costs.espionage.iron <= data.bots[index].iron
            ) {
                setData((prevData: any) => {
                    // Önce botların eski halini al
                    const updatedBots = [...prevData.bots];
                    // index'teki botu güncelle
                    updatedBots[index] = {
                        ...updatedBots[index],
                        espionage: updatedBots[index].espionage + 1,
                        gold: Math.round(updatedBots[index].gold - build_costs.espionage.gold),
                        wood: Math.round(updatedBots[index].wood - build_costs.espionage.wood),
                        clay: Math.round(updatedBots[index].clay - build_costs.espionage.clay),
                        iron: Math.round(updatedBots[index].iron - build_costs.espionage.iron),
                    };
                    // Güncellenmiş botları geri döndür
                    return {
                        ...prevData,
                        bots: updatedBots,
                    };
                });
            }
        }
    }

    setData((prevData: any) => {
        // Önce botların eski halini al
        const updatedBots = [...prevData.bots];
        // index'teki botu güncelle
        updatedBots[index] = {
            ...updatedBots[index],
            // gold: updatedBots[index].gold + income,
            inflation: inflationRate,
            population: resultPopulation,
            income: income - (buildMaintenanceGold + armyMaintenanceGold),
            gold: Math.round(updatedBots[index].gold + (income - (buildMaintenanceGold + armyMaintenanceGold))),
            wood: updatedBots[index].wood + Math.round(buildIncomeWood - (buildMaintenanceWood + armyMaintenanceWood)),
            clay: updatedBots[index].clay + Math.round(buildIncomeClay - (buildMaintenanceClay + armyMaintenanceClay)),
            iron: updatedBots[index].wood + Math.round(buildIncomeIron - (buildMaintenanceIron + armyMaintenanceIron)),
        };
        // Güncellenmiş botları geri döndür
        return {
            ...prevData,
            bots: updatedBots,
        };
    });
}