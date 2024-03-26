export class EncontrarTodoQueryDTO {
    pagina: number;
    cantidad: number;
    ordenamiento: Object;
    constructor(pagina: number, cantidad: number, ordenamiento: Object){
        this.pagina = pagina;
        this.cantidad = cantidad;
        this.ordenamiento = ordenamiento;
    }
    get saltar(): number {
        return this.cantidad * this.pagina;
    }
    isPaginado() {
        return (this.cantidad != undefined && this.pagina != undefined);
    }
}