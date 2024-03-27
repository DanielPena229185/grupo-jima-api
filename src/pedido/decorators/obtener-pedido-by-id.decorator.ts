import { BadRequestException, ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import { parseCamposQuery } from "src/utils/parses/parse-campos-query";
import { parseRelacionesQuery } from "src/utils/parses/parse-relaciones-query";
import { EncontrarPedidoById } from "../input-dtos/obtener-pedido-by-id.dto";

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

const relacionesValidasQuery = ['repartidor', 'tienda', 'tortilleria', 'paquetes', 'paquetes.producto', 'paquetes.producto.gramaje'];

export const ObtenerPedidoByIdQuery = createParamDecorator((data, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const camposQuery: string = req.query['campos'] as string;
    const campos: Object = parseCamposQuery(camposQuery, camposValidosQuery);
    if(Object.keys(campos).length === 0){
        throw new BadRequestException(`El pedido de tortillerias requiere información de los campos`);
    }
    const relacionesQuery: string = req.query['relaciones'] as string;
    const relaciones: string[] = parseRelacionesQuery(relacionesQuery, relacionesValidasQuery);
    const query : EncontrarPedidoById = new EncontrarPedidoById(campos, relaciones);
    return query;
})