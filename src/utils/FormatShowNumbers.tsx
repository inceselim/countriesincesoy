export const formatShowNumber = (num: number) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'm'; // 1 milyondan büyükse
    } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + 'k'; // 1000'den büyükse
    } else {
        return num.toString(); // 1000'den küçükse
    }
};