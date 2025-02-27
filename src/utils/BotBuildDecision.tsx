import { build_income } from "../data/build_income";
import { ArmyMaintenanceGold, ArmyMaintenanceWood, ArmyMaintenanceClay, ArmyMaintenanceIron } from "./ArmyMaintenance";
import { BuildMaintenanceGold, BuildMaintenanceWood, BuildMaintenanceClay, BuildMaintenanceIron } from "./BuildMaintenance";
import { calculateSoldierAmount } from "./CalculateSoldierAmount";

export const BotBuildDecision = (data: any, index: number) => {
    console.log("")
    console.log("")
    console.log("BOT BUILD DECISION")
    console.log(data)
    console.log("")
    console.log("")
    console.log("")
    let buildIncomeGold = ((build_income.mine.gold * data.mine) + (build_income.woodcutter.gold * data.woodcutter) + (build_income.brickhouse.gold * data.brickhouse) + (build_income.trade_center.gold * data.trade_center) + (build_income.avm.gold * data.avm))
    let buildIncomeWood: number = ((build_income.woodcutter.wood * data.woodcutter) + (build_income.avm.wood * data.avm))
    let buildIncomeClay: number = ((build_income.brickhouse.clay * data.brickhouse) + (build_income.avm.clay * data.avm))
    let buildIncomeIron: number = ((build_income.mine.iron * data.mine) + (build_income.avm.iron * data.avm))

    let buildMaintenanceGold = BuildMaintenanceGold(data)
    let buildMaintenanceWood = BuildMaintenanceWood(data)
    let buildMaintenanceClay = BuildMaintenanceClay(data)
    let buildMaintenanceIron = BuildMaintenanceIron(data)

    let armyMaintenanceGold = ArmyMaintenanceGold(data)
    let armyMaintenanceWood = ArmyMaintenanceWood(data)
    let armyMaintenanceClay = ArmyMaintenanceClay(data)
    let armyMaintenanceIron = ArmyMaintenanceIron(data)

    let incomeWood: number = Math.round(buildIncomeWood - (buildMaintenanceWood + armyMaintenanceWood))
    let incomeClay: number = Math.round(buildIncomeClay - (buildMaintenanceClay + armyMaintenanceClay))
    let incomeIron: number = Math.round(buildIncomeIron - (buildMaintenanceIron + armyMaintenanceIron))
    let incomeGold: number = Math.round(buildIncomeGold - (buildMaintenanceGold + armyMaintenanceGold))

    const decisions: string[] = []; // Botun inşa edeceği binalar için karar listesi
    const recruitments: string[] = []; // Botun basacağı askerler için karar listesi

    if (data.population >= data.parliament * 1000) {
        decisions.push('parliament');// parliament kapasitesi dolduysa parliament kur
    }
    if (data.population >= data.farm * 1000) {
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
    if (data.barracks * 50 <= data.spearman + data.bowman + data.swordman + data.knight + data.catapult) {
        decisions.push('barracks'); // Kışla doluysa yeni kışla kur
    }
    if (
        data.castle < 20 &&
        data.barracks > data.castle &&
        incomeWood > 90 &&
        incomeClay > 90 &&
        incomeIron > 90
    ) {
        decisions.push('castle');
    }
    if (data.tower < 20 && incomeWood > 90 && incomeClay > 90 && incomeIron > 90) {
        decisions.push('tower');
    }
    // if (data.espionage > 20 && data.bots[index].tower >= 20 && incomeWood > 90 && incomeClay > 90 && incomeIron > 90) {
    //     decisions.push('espionage');
    // }



    // data.bots[index].gold >= 300 && data.bots[index].wood >= 100 && data.bots[index].clay >= 100 && data.bots[index].iron >= 100
    if (data.gold >= 300 && data.clay >= 100) {
        // if (data.bots[index].gold >= 300 && data.bots[index].wood >= 100) {
        recruitments.push('spearman');
    }
    if (data.gold >= 300 && incomeClay >= 100) {
        recruitments.push('bowman');
    }
    if (data.gold >= 300 && incomeIron >= 100) {
        recruitments.push('swordman');
    }
    if (data.gold >= 300 && data.wood >= 100 && data.spearman >= data.axeman) {
        recruitments.push('axeman');
    }
    if ((data.gold >= 1000 && data.iron >= 100) && (data.spearman - 20 > data.knight)) {
        recruitments.push('knight');
    }
    if (((data.spearman - 10) + (data.bowman - 5) + (data.knight - 10)) > data.catapult && incomeClay >= 100) {
        recruitments.push('catapult');
    }
    return {
        buildings: decisions.length > 0 ? decisions : null,
        troops: recruitments.length > 0 ? recruitments : null
    }
};