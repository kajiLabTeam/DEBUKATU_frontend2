export function caloriePerDay(modelWeight: number, currentWeight: number, days: number): number {
    const diffWeight = modelWeight - currentWeight;
    const mustCalorie = diffWeight * 7200;
    const perDay = mustCalorie / days;
    return perDay;
}