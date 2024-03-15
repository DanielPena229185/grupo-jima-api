import { Injectable } from "@nestjs/common";
import { CrearPedidoDTO } from "./input-dtos/crear-pedido-dto";
import { Pedido } from "src/entities";
import { PedidoService } from "./pedido.service";
import { NegocioException } from "src/utils/exceptions/negocio-exception";

@Injectable()
export class ValidacionesNegocioProducto {

    constructor(private readonly pedidoService: PedidoService) { }

    async crearPedido(pedido: CrearPedidoDTO): Promise<Pedido> {
        this.crearPedidoValidaciones(pedido);
        return this.pedidoService.crearPedido(pedido);
    }

    private crearPedidoValidaciones(pedido: CrearPedidoDTO) {
        if(!pedido.tiendaId || pedido.tiendaId.length === 0){
            throw new NegocioException('Se debe indicar que tienda atenderá este pedido');
        }
        if (!pedido.paquetes || pedido.paquetes.length) {
            throw new NegocioException('Debe haber al menos un paquete en el pedido');
        }
        pedido.paquetes.some(paquete => {
            if(paquete.cantidad < 0){
                throw new NegocioException('Los paquetes del pedido deben contener al menos 1 de cantidad');
            }
            if(!paquete.producto.id){
                throw new NegocioException('El paquete debe indicar el gramaje');
            }
        })
    }
}