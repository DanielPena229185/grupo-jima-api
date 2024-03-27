export function parseRelacionesQuery(relacionesQuery: string, relacionesValidas: Array<string>): string[] {
    if (!relacionesQuery) return [];
    const arraySplitted = relacionesQuery.split(",").map(field => field.trim());
    const relacionesArray: string[] = [];
    arraySplitted.forEach(field => {
        if (relacionesValidas.includes(field)) {
            relacionesArray.push(field);
        }
    });
    return relacionesArray;
}