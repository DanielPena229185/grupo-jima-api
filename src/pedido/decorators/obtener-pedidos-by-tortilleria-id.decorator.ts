import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { parseCamposQuery } from "src/utils/parses/parse-campos-query";
import { parseCantidad } from "src/utils/parses/parse-cantidad";
import { parseOrdenamiento } from "src/utils/parses/parse-ordenamiento";
import { parsePagina } from "src/utils/parses/parse-pagina";
import { parseRelacionesQuery } from "src/utils/parses/parse-relaciones-query";
import { ObtenerPedidosByTortilleriaIdQueryDTO } from "../input-dtos/obtener-pedidos-by-tortilleria-id.dto";

const camposOrdenamiento = ['fechaHoraCreacion'];
const camposValidosQuery = new Map<string, boolean | object>([
    //Columnas Pedidos
    ['id', true],
    ['codigoRastreo', true],
    ['detalles', true],
    ['estado', true],
    ['fechaHoraCreacion', true],
    ['fechaHoraActualizado', true],
    ['total', true],
    //Elementos de las relaciones default
    ['repartidor', { id: true, nombres: true, apellidos: true, telefono: true }],
    ['tienda', { id: true, telefono: true, nombre: true }],
    ['tortilleria', { id: true, telefono: true, nombre: true }],
    ['paquetes', { id: true, cantidad: true, producto: true }]
])

const relacionesValidasQuery = ['repartidor', 'tienda', 'tortilleria', 'paqueteria'];

export const ObtenerPedidosByTortilleriaIdDecorator = createParamDecorator((data, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const paginaQuery: string = req.query['pagina'] as string;
    const pagina: number = parsePagina(paginaQuery);
    const cantidadQuery: string = req.query['cantidad'] as string;
    const cantidad: number = parseCantidad(cantidadQuery);
    const ordenamientoQuery = req.query['ordenamiento'] as string;
    const ordenamiento: object = parseOrdenamiento(ordenamientoQuery, camposOrdenamiento);
    const camposQuery: string = req.query['campos'] as string;
    const campos: Object = parseCamposQuery(camposQuery, camposValidosQuery);
    if(Object.keys(campos).length === 0){
        throw new BadRequestException(`Pedidos de tortillerias requiere información de los campos`);
    }
    const relacionesQuery: string = req.query['relaciones'] as string;
    const relaciones: Object = parseRelacionesQuery(relacionesQuery, relacionesValidasQuery);
    const codigoRastreo: string = req.query['codigoRastreo'] as string;
    const detalles: string = req.query['detalles'] as string;
    const nombreTienda: string = req.query['nombreTienda'] as string;
    const query: ObtenerPedidosByTortilleriaIdQueryDTO =
        new ObtenerPedidosByTortilleriaIdQueryDTO(
            pagina,
            cantidad,
            ordenamiento,
            campos,
            codigoRastreo,
            detalles,
            nombreTienda,
            relaciones
        )
    return query;
})