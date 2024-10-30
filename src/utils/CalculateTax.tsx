export function CalculateInterest(population: any) {
    const interestRatePerThousand = 10;
    const thousands = Math.floor(population / 1000); // Nüfusu 1000'e böl ve aşağıya yuvarla
    return thousands * interestRatePerThousand; // Faiz gelirini hesapla
}