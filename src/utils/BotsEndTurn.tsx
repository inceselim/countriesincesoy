import { build_income } from "../data/build_income"
import { ArmyMaintenanceGold, ArmyMaintenanceWood, ArmyMaintenanceClay, ArmyMaintenanceIron } from "./ArmyMaintenance"
import { BuildMaintenanceGold, BuildMaintenanceWood, BuildMaintenanceClay, BuildMaintenanceIron } from "./BuildMaintenance"
import { CalculateInterest } from "./CalculateTax"
import { CalculatePopBot } from "./CalculatePopBot"
import { BotBuildDecision } from "./BotBuildDecision"
import { build_costs } from "../data/build_costs"
import { calculateSoldierAmount } from "./CalculateSoldierAmount"


export const BotsEndTurn = async (dataBots: any[], setDataBots: (data: any) => void) => {
    dataBots.map((item, index) => {
        console.log("resssss", index)
        console.log("resssss", item)

        let parliamentPerformance = dataBots[index].population < (dataBots[index].parliament * 1000) ? 1 : (100 - 5 * ((dataBots[index].population - (dataBots[index].parliament * 1000)) / 100)) / 100
        let taxIncome = CalculateInterest(dataBots[index].population)
        let buildIncomeGold = ((build_income.mine.gold * dataBots[index].mine) + (build_income.woodcutter.gold * dataBots[index].woodcutter) + (build_income.brickhouse.gold * dataBots[index].brickhouse) + (build_income.trade_center.gold * dataBots[index].trade_center) + (build_income.avm.gold * dataBots[index].avm))
        let buildIncomeWood: number = ((build_income.woodcutter.wood * dataBots[index].woodcutter) + (build_income.avm.wood * dataBots[index].avm))
        let buildIncomeClay: number = ((build_income.brickhouse.clay * dataBots[index].brickhouse) + (build_income.avm.clay * dataBots[index].avm))
        let buildIncomeIron: number = ((build_income.mine.iron * dataBots[index].mine) + (build_income.avm.iron * dataBots[index].avm))

        let buildMaintenanceGold = BuildMaintenanceGold(dataBots[index])
        let buildMaintenanceWood = BuildMaintenanceWood(dataBots[index])
        let buildMaintenanceClay = BuildMaintenanceClay(dataBots[index])
        let buildMaintenanceIron = BuildMaintenanceIron(dataBots[index])

        let armyMaintenanceGold = ArmyMaintenanceGold(dataBots[index])
        let armyMaintenanceWood = ArmyMaintenanceWood(dataBots[index])
        let armyMaintenanceClay = ArmyMaintenanceClay(dataBots[index])
        let armyMaintenanceIron = ArmyMaintenanceIron(dataBots[index])


        let interest = 0;
        function calculateInterest() {
            if (dataBots[index].gold < 1000) {
                interest = 0; // 1000 altından azsa faiz yok
            }

            let thousandBlocks = Math.floor(dataBots[index].gold / 1000);  // Her 1000 altın için bir blok
            interest = thousandBlocks * 5;  // Her blok için 5 altın faiz geliri
            return interest;
        }
        calculateInterest()

        function polityGoldEffects() {
            // Polities
            //Monarchy,Aristocracy,Theocracy,Dictator,Democracy
            if (dataBots[index].polity == "premium") {
                return 1;
            }
            else if (dataBots[index].polity == "Democracy") {
                return 0
            }
            else if (dataBots[index].polity == "Dictator") {
                return 0
            }
            else if (dataBots[index].polity == "Theocracy") {
                return 0
            }
            else if (dataBots[index].polity == "Aristocracy") {
                return 0.1
            }
            else if (dataBots[index].polity == "Monarchy") {
                return -0.2
            }
            else {
                // Eğer bulunamazsa veya `population` yoksa, false döndür
                return 0;
            }
        }
        const polityGoldBonus = polityGoldEffects();

        let resultPopulation: number = CalculatePopBot(dataBots[index])
        let countryFocusBonusGold = dataBots[index].countryFocus == "income" ? 0.1 :
            dataBots[index].countryFocus == "premium" ? 1 : 0


        let baseIncome: number = Math.round(taxIncome + interest + buildIncomeGold)
        let income: number = Math.round(((baseIncome + Math.ceil(baseIncome * polityGoldBonus) + Math.ceil(baseIncome * countryFocusBonusGold) * parliamentPerformance) * 1))

        let kararlar: any = BotBuildDecision(dataBots[index], index)
        console.log("KARARLAR")
        console.log("KARARLAR")
        console.log("KARARLAR: ", kararlar)
        console.log("KARARLAR")
        console.log("KARARLAR")



        if (kararlar?.buildings?.length > 0) {
            if (kararlar?.buildings?.includes("parliament")) {
                if (build_costs.parliament.gold <= dataBots[index].gold &&
                    build_costs.parliament.wood <= dataBots[index].wood &&
                    build_costs.parliament.clay <= dataBots[index].clay &&
                    build_costs.parliament.iron <= dataBots[index].iron
                ) {
                    setDataBots((prevdataBots: any) => {
                        // bots dizisinin bir kopyasını oluştur
                        const updatedBots = [...prevdataBots];
                        // Verilen indeksteki axeman değerini artır
                        updatedBots[index].parliament += 1;
                        // Güncellenmiş bots dizisiyle state'i güncelle
                        return {
                            ...prevdataBots,
                            bots: updatedBots,
                        };
                    });
                }
            }
            if (kararlar?.buildings?.includes("farm")) {
                setDataBots((prevdataBots: any) => {
                    // bots dizisinin bir kopyasını oluştur
                    const updatedBots = [...prevdataBots];
                    // Verilen indeksteki axeman değerini artır
                    updatedBots[index].farm += 1;
                    // Güncellenmiş bots dizisiyle state'i güncelle
                    return {
                        ...prevdataBots,
                        bots: updatedBots,
                    };
                });
            }
            if (kararlar?.buildings?.includes("woodcutter")) {
                if (build_costs.woodcutter.gold <= dataBots[index].gold &&
                    build_costs.woodcutter.wood <= dataBots[index].wood &&
                    build_costs.woodcutter.clay <= dataBots[index].clay &&
                    build_costs.woodcutter.iron <= dataBots[index].iron
                ) {
                    setDataBots((prevdataBots: any) => {
                        // Önce botların eski halini al
                        const updatedBots = [...prevdataBots];
                        // index'teki botu güncelle
                        updatedBots[index] = {
                            ...updatedBots[index],
                            woodcutter: updatedBots[index].woodcutter++,
                            gold: Math.round(updatedBots[index].gold - build_costs.woodcutter.gold),
                            wood: Math.round(updatedBots[index].wood - build_costs.woodcutter.wood),
                            clay: Math.round(updatedBots[index].clay - build_costs.woodcutter.clay),
                            iron: Math.round(updatedBots[index].iron - build_costs.woodcutter.iron),
                        };
                        // Güncellenmiş botları geri döndür
                        return {
                            ...prevdataBots,
                            bots: updatedBots,
                        };
                    });
                }
            }
            if (kararlar?.buildings?.includes("brickhouse")) {
                if (build_costs.brickhouse.gold <= dataBots[index].gold &&
                    build_costs.brickhouse.wood <= dataBots[index].wood &&
                    build_costs.brickhouse.clay <= dataBots[index].clay &&
                    build_costs.brickhouse.iron <= dataBots[index].iron
                ) {
                    setDataBots((prevdataBots: any) => {
                        // Önce botların eski halini al
                        const updatedBots = [...prevdataBots];
                        // index'teki botu güncelle
                        updatedBots[index] = {
                            ...updatedBots[index],
                            brickhouse: updatedBots[index].brickhouse++,
                            gold: Math.round(updatedBots[index].gold - build_costs.brickhouse.gold),
                            wood: Math.round(updatedBots[index].wood - build_costs.brickhouse.wood),
                            clay: Math.round(updatedBots[index].clay - build_costs.brickhouse.clay),
                            iron: Math.round(updatedBots[index].iron - build_costs.brickhouse.iron),
                        };
                        // Güncellenmiş botları geri döndür
                        return {
                            ...prevdataBots,
                            bots: updatedBots,
                        };
                    });
                }
            }
            if (kararlar?.buildings?.includes("mine")) {
                setDataBots((prevdataBots: any) => {
                    // bots dizisinin bir kopyasını oluştur
                    const updatedBots = [...prevdataBots];
                    // Verilen indeksteki axeman değerini artır
                    updatedBots[index].mine += 1;
                    // Güncellenmiş bots dizisiyle state'i güncelle
                    return {
                        ...prevdataBots,
                        bots: updatedBots,
                    };
                });
            }
            if (kararlar?.buildings?.includes("trade_center")) {
                if (build_costs.trade_center.gold <= dataBots[index].gold &&
                    build_costs.trade_center.wood <= dataBots[index].wood &&
                    build_costs.trade_center.clay <= dataBots[index].clay &&
                    build_costs.trade_center.iron <= dataBots[index].iron
                ) {
                    setDataBots((prevdataBots: any) => {
                        // Önce botların eski halini al
                        const updatedBots = [...prevdataBots];
                        // index'teki botu güncelle
                        updatedBots[index] = {
                            ...updatedBots[index],
                            trade_center: updatedBots[index].trade_center++,
                            gold: Math.round(updatedBots[index].gold - build_costs.trade_center.gold),
                            wood: Math.round(updatedBots[index].wood - build_costs.trade_center.wood),
                            clay: Math.round(updatedBots[index].clay - build_costs.trade_center.clay),
                            iron: Math.round(updatedBots[index].iron - build_costs.trade_center.iron),
                        };
                        // Güncellenmiş botları geri döndür
                        return {
                            ...prevdataBots,
                            bots: updatedBots,
                        };
                    });
                }
            }
            if (kararlar?.buildings?.includes("barracks")) {
                if (build_costs.barracks.gold <= dataBots[index].gold &&
                    build_costs.barracks.wood <= dataBots[index].wood &&
                    build_costs.barracks.clay <= dataBots[index].clay &&
                    build_costs.barracks.iron <= dataBots[index].iron
                ) {
                    setDataBots((prevdataBots: any) => {
                        // Önce botların eski halini al
                        const updatedBots = [...prevdataBots];
                        // index'teki botu güncelle
                        updatedBots[index] = {
                            ...updatedBots[index],
                            barracks: updatedBots[index].barracks++,
                            gold: Math.round(updatedBots[index].gold - build_costs.barracks.gold),
                            wood: Math.round(updatedBots[index].wood - build_costs.barracks.wood),
                            clay: Math.round(updatedBots[index].clay - build_costs.barracks.clay),
                            iron: Math.round(updatedBots[index].iron - build_costs.barracks.iron),
                        };
                        // Güncellenmiş botları geri döndür
                        return {
                            ...prevdataBots,
                            bots: updatedBots,
                        };
                    });
                }
            }
            if (kararlar?.buildings?.includes("castle")) {
                if (build_costs.castle.gold <= dataBots[index].gold &&
                    build_costs.castle.wood <= dataBots[index].wood &&
                    build_costs.castle.clay <= dataBots[index].clay &&
                    build_costs.castle.iron <= dataBots[index].iron
                ) {
                    setDataBots((prevdataBots: any) => {
                        // Önce botların eski halini al
                        const updatedBots = [...prevdataBots];
                        // index'teki botu güncelle
                        updatedBots[index] = {
                            ...updatedBots[index],
                            castle: updatedBots[index].castle++,
                            gold: Math.round(updatedBots[index].gold - build_costs.castle.gold),
                            wood: Math.round(updatedBots[index].wood - build_costs.castle.wood),
                            clay: Math.round(updatedBots[index].clay - build_costs.castle.clay),
                            iron: Math.round(updatedBots[index].iron - build_costs.castle.iron),
                        };
                        // Güncellenmiş botları geri döndür
                        return {
                            ...prevdataBots,
                            bots: updatedBots,
                        };
                    });
                }
            }
            if (kararlar?.buildings?.includes("tower")) {
                if (build_costs.tower.gold <= dataBots[index].gold &&
                    build_costs.tower.wood <= dataBots[index].wood &&
                    build_costs.tower.clay <= dataBots[index].clay &&
                    build_costs.tower.iron <= dataBots[index].iron
                ) {
                    setDataBots((prevdataBots: any) => {
                        // Önce botların eski halini al
                        const updatedBots = [...prevdataBots];
                        // index'teki botu güncelle
                        updatedBots[index] = {
                            ...updatedBots[index],
                            tower: updatedBots[index].tower++,
                            gold: Math.round(updatedBots[index].gold - build_costs.tower.gold),
                            wood: Math.round(updatedBots[index].wood - build_costs.tower.wood),
                            clay: Math.round(updatedBots[index].clay - build_costs.tower.clay),
                            iron: Math.round(updatedBots[index].iron - build_costs.tower.iron),
                        };
                        // Güncellenmiş botları geri döndür
                        return {
                            ...prevdataBots,
                            bots: updatedBots,
                        };
                    });
                }
            }
        }
        if (kararlar?.troops?.length > 0) {
            if (kararlar?.buildings?.includes("tower")) {
                if (build_costs.tower.gold <= dataBots[index].gold &&
                    build_costs.tower.wood <= dataBots[index].wood &&
                    build_costs.tower.clay <= dataBots[index].clay &&
                    build_costs.tower.iron <= dataBots[index].iron
                ) {
                    setDataBots((prevdataBots: any) => {
                        // Önce botların eski halini al
                        const updatedBots = [...prevdataBots];
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
                            ...prevdataBots,
                            bots: updatedBots,
                        };
                    });
                }
            }
        }



        setTimeout(() => {
            setDataBots((prevdataBots: any) => {
                // Önce botların eski halini al
                const updatedBots = [...prevdataBots];
                // index'teki botu güncelle
                updatedBots[index] = {
                    ...updatedBots[index],
                    // gold: updatedBots[index].gold + income,
                    inflation: 1,
                    population: resultPopulation,
                    income: income - (buildMaintenanceGold + armyMaintenanceGold),
                    gold: Math.round(updatedBots[index].gold + (income - (buildMaintenanceGold + armyMaintenanceGold))),
                    wood: updatedBots[index].wood + Math.round(buildIncomeWood - (buildMaintenanceWood + armyMaintenanceWood)),
                    clay: updatedBots[index].clay + Math.round(buildIncomeClay - (buildMaintenanceClay + armyMaintenanceClay)),
                    iron: updatedBots[index].wood + Math.round(buildIncomeIron - (buildMaintenanceIron + armyMaintenanceIron)),
                };
                // Güncellenmiş botları geri döndür
                return {
                    ...prevdataBots,
                    bots: updatedBots,
                };
            });
        }, 0.2 * 1000);
    })
}