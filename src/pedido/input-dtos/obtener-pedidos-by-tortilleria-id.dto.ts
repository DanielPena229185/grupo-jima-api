import { EncontrarTodoQueryDTO } from "src/utils/input-dto/encontrar-todo-query.dto";

export class EncontrarPedidosByTortilleriaIdQueryDTO extends EncontrarTodoQueryDTO {
    campos: Object;
    codigoRastreo: string;
    detalles: string;
    nombreTienda: string;
    relaciones: string[];
    override pagina: number;
    override cantidad: number;
    override ordenamiento: Object;

    constructor(
        pagina: number,
        cantidad: number,
        ordenamiento: Object,
        campos: Object,
        codigoRastreo: string,
        detalles: string,
        nombreTienda: string,
        relaciones: string[]) {
        super(pagina, cantidad, ordenamiento);
        this.campos = campos;
        this.codigoRastreo = codigoRastreo;
        this.detalles = detalles;
        this.nombreTienda = nombreTienda;
        this.relaciones = relaciones;
    }
}