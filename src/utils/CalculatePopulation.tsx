import { polities } from "../data/polity_bonuses";

export const CalculatePopulation = (data: any, setData: (data: any) => void) => {
    // return Math.round((data.population * 1.02) + (1));
    if (data.population >= data.farm * 1000) {
        return data;
    }
    else if (data.population < 1000) {
        return 1000;
    }
    else {
        // Polities
        //Monarchy,Aristocracy,Theocracy,Dictator,Democracy
        function checkPolityEffects() {
            // Eğer yönetim biçimi varsa ve `effects` içinde `population` varsa, true döndür
            if (data.polity == "Premium") {
                return 1;
            }
            else if (data.polity == "Democracy") {
                return 0
            }
            else if (data.polity == "Dictator") {
                return 0.2
            }
            else if (data.polity == "Theocracy") {
                return 0
            }
            else if (data.polity == "Aristocracy") {
                return 0
            }
            else if (data.polity == "Monarchy") {
                return -0.2
            }
            else {
                // Eğer bulunamazsa veya `population` yoksa, false döndür
                return 0;
            }
        }
        const polityBonus = checkPolityEffects();
        let focusBonus = data.countryFocus == "pop" ? 0.2 :
            data.countryFocus == "premium" ? 1 : 0
        setData((prevData: any) => ({
            ...prevData,
            prevPopulation: data.population,
            population: Math.ceil(data.population + ((data.population * 0.003) + ((data.population * 0.004) * (focusBonus + polityBonus))))
        }
        ));
    }
};