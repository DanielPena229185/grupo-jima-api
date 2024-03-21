export class PedidoOutputDTO{
    id:string;
    paquetes:PaqueteDTO[];
    codigoRastreo:string;
    repartidor:RepartidorDTO;
    tienda:TiendaDTO;
    tortilleria:TortilleriaDTO;
}

class PaqueteDTO{
producto:ProductoDTO;
cantidad:number;
}

class ProductoDTO{
gramaje:GramajeDTO;
}

class GramajeDTO{
gramaje:number;
}

class RepartidorDTO{
nombres:string;
apellidos:string;
}

class TiendaDTO{
nombre:string;
}

class TortilleriaDTO{

}