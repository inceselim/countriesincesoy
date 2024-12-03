import { build_income } from "../data/build_income";
import { ArmyMaintenanceGold, ArmyMaintenanceWood, ArmyMaintenanceClay, ArmyMaintenanceIron } from "./ArmyMaintenance";
import { BuildMaintenanceGold, BuildMaintenanceWood, BuildMaintenanceClay, BuildMaintenanceIron } from "./BuildMaintenance";
import { calculateSoldierAmount } from "./CalculateSoldierAmount";

export const BotBuildDecision = (data: any, index: number) => {
    let buildIncomeGold = ((build_income.mine.gold * data.bots[index].mine) + (build_income.woodcutter.gold * data.bots[index].woodcutter) + (build_income.brickhouse.gold * data.bots[index].brickhouse) + (build_income.trade_center.gold * data.bots[index].trade_center) + (build_income.avm.gold * data.bots[index].avm))
    let buildIncomeWood: number = ((build_income.woodcutter.wood * data.bots[index].woodcutter) + (build_income.avm.wood * data.bots[index].avm))
    let buildIncomeClay: number = ((build_income.brickhouse.clay * data.bots[index].brickhouse) + (build_income.avm.clay * data.bots[index].avm))
    let buildIncomeIron: number = ((build_income.mine.iron * data.bots[index].mine) + (build_income.avm.iron * data.bots[index].avm))
    console.log("AAA: ")
    console.log("AAA: ", data)
    console.log("AAA: ",)
    let buildMaintenanceGold = BuildMaintenanceGold(data.bots[index])
    let buildMaintenanceWood = BuildMaintenanceWood(data.bots[index])
    let buildMaintenanceClay = BuildMaintenanceClay(data.bots[index])
    let buildMaintenanceIron = BuildMaintenanceIron(data.bots[index])

    let armyMaintenanceGold = ArmyMaintenanceGold(data.bots[index])
    let armyMaintenanceWood = ArmyMaintenanceWood(data.bots[index])
    let armyMaintenanceClay = ArmyMaintenanceClay(data.bots[index])
    let armyMaintenanceIron = ArmyMaintenanceIron(data.bots[index])

    let incomeWood: number = Math.round(buildIncomeWood - (buildMaintenanceWood + armyMaintenanceWood))
    let incomeClay: number = Math.round(buildIncomeClay - (buildMaintenanceClay + armyMaintenanceClay))
    let incomeIron: number = Math.round(buildIncomeIron - (buildMaintenanceIron + armyMaintenanceIron))
    let incomeGold: number = Math.round(buildIncomeGold - (buildMaintenanceGold + armyMaintenanceGold))

    let armyPop = calculateSoldierAmount(data.bots[index])
    console.log("armyPOp: ")
    console.log("armyPOp: ")
    console.log("armyPOp: ", armyPop)
    console.log("armyPOp: ")
    console.log("armyPOp: ")
    const decisions: string[] = []; // Botun inşa edeceği binalar için karar listesi
    const recruitments: string[] = []; // Botun basacağı askerler için karar listesi

    if (data.bots[index].population >= data.bots[index].parliament * 1000) {
        decisions.push('parliament');// parliament kapasitesi dolduysa parliament kur
    }
    if (data.bots[index].population >= data.bots[index].farm * 1000) {
        console.log("farm kurdu") // Nüfus kapasitesi dolduysa çiftlik kur
        decisions.push('farm');
    }
    if (incomeWood < 100) {
        decisions.push('woodcutter'); // Oduncu geliri azsa woodcutter kur
    }
    if (incomeClay < 100) {
        decisions.push('brickhouse'); // Kil geliri azsa brickhouse kur
    }
    if (incomeIron < 100) {
        decisions.push('mine'); // IRon geliri azsa mine kur
    }
    if (incomeGold < 100) {
        decisions.push('trade_center'); // IRon geliri azsa mine kur
    }
    if (data.bots[index].barracks * 50 <= data.bots[index].spearman + data.bots[index].bowman + data.bots[index].swordman + data.bots[index].knight + data.bots[index].catapult) {
        decisions.push('barracks'); // Kışla doluysa yeni kışla kur
    }
    if (
        data.bots[index].castle < 20 &&
        data.bots[index].barracks > data.bots[index].castle &&
        incomeWood > 90 &&
        incomeClay > 90 &&
        incomeIron > 90
    ) {
        decisions.push('castle');
    }
    if (data.bots[index].tower < 20 && data.bots[index].barracks > data.bots[index].tower && incomeWood > 90 && incomeClay > 90 && incomeIron > 90) {
        decisions.push('tower');
    }
    if (data.bots[index].espionage < 20 && data.bots[index].tower >= 20 && incomeWood > 90 && incomeClay > 90 && incomeIron > 90) {
        decisions.push('espionage');
    }



    // data.bots[index].gold >= 300 && data.bots[index].wood >= 100 && data.bots[index].clay >= 100 && data.bots[index].iron >= 100
    if (data.bots[index].gold >= 300 && data.bots[index].clay >= 10) {
        // if (data.bots[index].gold >= 300 && data.bots[index].wood >= 100) {
        recruitments.push('spearman');
    }
    if (data.bots[index].gold >= 300 && incomeClay >= 10) {
        recruitments.push('bowman');
    }
    if (data.bots[index].gold >= 300 && incomeIron >= 100) {
        recruitments.push('swordman');
    }
    if (data.bots[index].gold >= 300 && data.bots[index].wood >= 100 && data.bots[index].spearman >= data.bots[index].axeman) {
        recruitments.push('axeman');
    }
    if (data.bots[index].gold >= 300 && data.bots[index].iron >= 100) {
        recruitments.push('knight');
    }
    if (incomeWood >= 50 && incomeClay >= 100) {
        recruitments.push('catapult');
    }
    return {
        buildings: decisions.length > 0 ? decisions : null,
        troops: recruitments.length > 0 ? recruitments : null
    }
};