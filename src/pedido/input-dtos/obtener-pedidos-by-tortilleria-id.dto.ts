import { EncontrarTodoQueryDTO } from "src/utils/input-dto/encontrar-todo-query.dto";

export class ObtenerPedidosByTortilleriaIdQueryDTO extends EncontrarTodoQueryDTO {
    campos: Object;
    codigoRastreo: string;
    detalles: string;
    nombreTienda: string;
    relaciones: Object;
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
        relaciones: Object) {
        super(pagina, cantidad, ordenamiento);
        this.campos = campos;
        this.codigoRastreo = codigoRastreo;
        this.detalles = detalles;
        this.nombreTienda = nombreTienda;
        this.relaciones = relaciones;
    }
}