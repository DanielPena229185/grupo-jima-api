export function parseCamposQuery(camposParam: string, queryFieldsValid: Map<string, boolean | object>): object {
    if (!camposParam) return {};
    const arraySplitted = camposParam.split(",").map(campo => campo.trim());
    const camposObject = {};
    arraySplitted.forEach(campo => {
        if (queryFieldsValid.has(campo)) {
            camposObject[campo] = queryFieldsValid.get(campo);
        }
    });
    return camposObject;
}
