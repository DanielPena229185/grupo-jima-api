export function parseOrdenamiento(sortParam: string, camposOrdenamiento: Array<string>): object {
    if (!sortParam) return [];
    const allSortsSplitted = sortParam.split(",");
    const sorts: Record<string, number> = {};
    allSortsSplitted.forEach((s) => {
        let sortFieldSplitted = s.split("-");
        if (sortFieldSplitted.length == 2) {
            let sortField = sortFieldSplitted[1];
            if (camposOrdenamiento.includes(sortField)) {
                sorts[sortField] = -1
            }
        } else {
            if (camposOrdenamiento.includes(sortFieldSplitted[0])) {
                let sortField = sortFieldSplitted[0];
                sorts[sortField] = 1
            }
        }
    });
    return sorts;
}