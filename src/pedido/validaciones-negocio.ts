import { Injectable } from "@nestjs/common";
import { CrearPedidoDTO } from "./input-dtos/crear-pedido-dto";
import { Pedido } from "src/entities";
import { PedidoService } from "./pedido.service";

@Injectable()
export class ValidacionesNegocioProducto {

    constructor(private readonly pedidoService: PedidoService) {}

    async crearPedido(pedido: CrearPedidoDTO) : Promise<Pedido> {
        //
        return this.pedidoService.crearPedido(pedido);
    }
}