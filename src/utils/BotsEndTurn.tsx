import { build_income } from "../data/build_income"
import { ArmyMaintenanceGold, ArmyMaintenanceWood, ArmyMaintenanceClay, ArmyMaintenanceIron } from "../service/ArmyMaintenance"
import { BuildMaintenanceGold, BuildMaintenanceWood, BuildMaintenanceClay, BuildMaintenanceIron } from "../service/BuildMaintenance"
import { CalculateInterest } from "./CalculateTax"
import { CalculatePopBot } from "../service/population"
import { BotBuildDecision } from "./BotBuildDecision"
import { build_costs } from "../data/build_costs"
import { calculateSoldierAmount } from "./CalculateSoldierAmount"
import { soldier_costs } from "../data/soldier_costs"


export const BotsEndTurn = async (dataBots: any[], setDataBots: (data: any) => void) => {
    const updateBotBuild = (index: number, build: string) => {
        let tmpBuild = build
        console.log(tmpBuild)
        setDataBots((prevDataBots: any[]) => {
            // Yeni bir array oluşturun
            const updatedBots: any[] = [...prevDataBots];
            // Verilen indexteki bot ile işlem yap
            // parametre olarak gelen değerini bir artırın
            updatedBots[index] = {
                ...updatedBots[index],
                [tmpBuild]: (updatedBots[index][tmpBuild]) + 1,
                gold: dataBots[index].gold - build_costs[tmpBuild].gold,
                wood: dataBots[index].wood - build_costs[tmpBuild].wood,
                clay: dataBots[index].clay - build_costs[tmpBuild].clay,
                iron: dataBots[index].iron - build_costs[tmpBuild].iron,
            };
            return updatedBots;
        });
    }
    const updateBotTroops = (index: number, troop: string) => {
        let tmpTroop = troop
        console.log("Asker Basıldı: ", troop)
        setDataBots((prevDataBots: any[]) => {
            // Yeni bir array oluşturun
            const updatedBots: any[] = [...prevDataBots];
            // Verilen indexteki bot ile işlem yap
            // parametre olarak gelen değerini bir artırın
            updatedBots[index] = {
                ...updatedBots[index],
                [tmpTroop]: (updatedBots[index][tmpTroop]) + 1,
                gold: dataBots[index].gold - soldier_costs.spearman.gold,
                wood: dataBots[index].wood - soldier_costs.spearman.wood,
                clay: dataBots[index].clay - soldier_costs.spearman.clay,
                iron: dataBots[index].iron - soldier_costs.spearman.iron,
                population: dataBots[index].population - soldier_costs.spearman.population
            };
            return updatedBots;
        });
    }
    dataBots.map((item, index) => {
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
                    updateBotBuild(index, "parliament")
                }
            }
            if (kararlar?.buildings?.includes("farm")) {
                updateBotBuild(index, "farm")
            }
            if (kararlar?.buildings?.includes("woodcutter")) {
                if (build_costs.woodcutter.gold <= dataBots[index].gold &&
                    build_costs.woodcutter.wood <= dataBots[index].wood &&
                    build_costs.woodcutter.clay <= dataBots[index].clay &&
                    build_costs.woodcutter.iron <= dataBots[index].iron
                ) {
                    updateBotBuild(index, "woodcutter")
                }
            }
            if (kararlar?.buildings?.includes("brickhouse")) {
                if (build_costs.brickhouse.gold <= dataBots[index].gold &&
                    build_costs.brickhouse.wood <= dataBots[index].wood &&
                    build_costs.brickhouse.clay <= dataBots[index].clay &&
                    build_costs.brickhouse.iron <= dataBots[index].iron
                ) {
                    updateBotBuild(index, "brickhouse")
                }
            }
            if (kararlar?.buildings?.includes("mine")) {
                updateBotBuild(index, "mine")
            }
            if (kararlar?.buildings?.includes("trade_center")) {
                if (build_costs.trade_center.gold <= dataBots[index].gold &&
                    build_costs.trade_center.wood <= dataBots[index].wood &&
                    build_costs.trade_center.clay <= dataBots[index].clay &&
                    build_costs.trade_center.iron <= dataBots[index].iron
                ) {
                    updateBotBuild(index, "trade_center")
                }
            }
            if (kararlar?.buildings?.includes("barracks")) {
                if (build_costs.barracks.gold <= dataBots[index].gold &&
                    build_costs.barracks.wood <= dataBots[index].wood &&
                    build_costs.barracks.clay <= dataBots[index].clay &&
                    build_costs.barracks.iron <= dataBots[index].iron
                ) {
                    updateBotBuild(index, "barracks")
                }
            }
            if (kararlar?.buildings?.includes("castle")) {
                if (build_costs.castle.gold <= dataBots[index].gold &&
                    build_costs.castle.wood <= dataBots[index].wood &&
                    build_costs.castle.clay <= dataBots[index].clay &&
                    build_costs.castle.iron <= dataBots[index].iron
                ) {
                    updateBotBuild(index, "castle")
                }
            }
            if (kararlar?.buildings?.includes("tower")) {
                if (build_costs.tower.gold <= dataBots[index].gold &&
                    build_costs.tower.wood <= dataBots[index].wood &&
                    build_costs.tower.clay <= dataBots[index].clay &&
                    build_costs.tower.iron <= dataBots[index].iron
                ) {
                    updateBotBuild(index, "tower")
                }
            }
        }
        if (kararlar?.troops?.length > 0) {
            if (kararlar?.troops?.includes("spearman")) {
                if (soldier_costs.spearman.gold <= dataBots[index].gold &&
                    soldier_costs.spearman.wood <= dataBots[index].wood &&
                    soldier_costs.spearman.clay <= dataBots[index].clay &&
                    soldier_costs.spearman.iron <= dataBots[index].iron &&
                    soldier_costs.spearman.population <= dataBots[index].population
                ) {
                    updateBotTroops(index, "spearman")
                }
            }
            if (kararlar?.troops?.includes("bowman")) {
                if (soldier_costs.bowman.gold <= dataBots[index].gold &&
                    soldier_costs.bowman.wood <= dataBots[index].wood &&
                    soldier_costs.bowman.clay <= dataBots[index].clay &&
                    soldier_costs.bowman.iron <= dataBots[index].iron &&
                    soldier_costs.bowman.population <= dataBots[index].population
                ) {
                    updateBotTroops(index, "bowman")
                }
            }
            if (kararlar?.troops?.includes("swordman")) {
                if (soldier_costs.swordman.gold <= dataBots[index].gold &&
                    soldier_costs.swordman.wood <= dataBots[index].wood &&
                    soldier_costs.swordman.clay <= dataBots[index].clay &&
                    soldier_costs.swordman.iron <= dataBots[index].iron &&
                    soldier_costs.swordman.population <= dataBots[index].population
                ) {
                    updateBotTroops(index, "swordman")
                }
            }
            if (kararlar?.troops?.includes("axeman")) {
                if (soldier_costs.axeman.gold <= dataBots[index].gold &&
                    soldier_costs.axeman.wood <= dataBots[index].wood &&
                    soldier_costs.axeman.clay <= dataBots[index].clay &&
                    soldier_costs.axeman.iron <= dataBots[index].iron &&
                    soldier_costs.axeman.population <= dataBots[index].population
                ) {
                    updateBotTroops(index, "axeman")
                }
            }
            if (kararlar?.troops?.includes("knight")) {
                if (soldier_costs.knight.gold <= dataBots[index].gold &&
                    soldier_costs.knight.wood <= dataBots[index].wood &&
                    soldier_costs.knight.clay <= dataBots[index].clay &&
                    soldier_costs.knight.iron <= dataBots[index].iron &&
                    soldier_costs.knight.population <= dataBots[index].population
                ) {
                    updateBotTroops(index, "knight")
                }
            }
            if (kararlar?.troops?.includes("catapult")) {
                if (soldier_costs.knight.gold <= dataBots[index].gold &&
                    soldier_costs.knight.wood <= dataBots[index].wood &&
                    soldier_costs.knight.clay <= dataBots[index].clay &&
                    soldier_costs.knight.iron <= dataBots[index].iron &&
                    soldier_costs.knight.population <= dataBots[index].population
                ) {
                    updateBotTroops(index, "catapult")
                }
            }
        }



        setDataBots((prevDataBots: any[]) => {
            // Yeni bir array oluşturun
            const updatedBots = [...prevDataBots];
            // Verilen indexteki bot ile işlem yap
            // parametre olarak gelen değerini bir artırın
            updatedBots[index] = {
                ...updatedBots[index],
                inflation: 1,
                population: resultPopulation,
                income: income - (buildMaintenanceGold + armyMaintenanceGold),
                gold: Math.round(updatedBots[index].gold + (income - (buildMaintenanceGold + armyMaintenanceGold))),
                wood: updatedBots[index].wood + Math.round(buildIncomeWood - (buildMaintenanceWood + armyMaintenanceWood)),
                clay: updatedBots[index].clay + Math.round(buildIncomeClay - (buildMaintenanceClay + armyMaintenanceClay)),
                iron: updatedBots[index].wood + Math.round(buildIncomeIron - (buildMaintenanceIron + armyMaintenanceIron)),
            };
            return updatedBots;
        });
    })
}