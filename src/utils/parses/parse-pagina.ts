export function parsePagina(paginaParam: string): number {
    if(paginaParam === undefined){ return 1; }
    let page: number = parseInt(paginaParam) || 0;
    if(page < 0){ page = 1; }
    if(page > 1000000){ page = 1000000; }
    return page;
}