export function parseRelacionesQuery(relacionesQuery: string, relacionesValidas: Array<string>): object {
    if (!relacionesQuery) return {};
    const arraySplitted = relacionesQuery.split(",").map(field => field.trim());
    const objetoRelaciones = {};
    arraySplitted.forEach(field => {
        if (relacionesValidas.includes(field)) {
            objetoRelaciones[field] = true;
        }
    });
    return objetoRelaciones;
}