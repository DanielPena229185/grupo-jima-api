// TODO eliminar cuando se tenga la entidad de Pedido
export class Pedido {
  constructor(
    public id: number,
    public detalles: Producto[],
    public fecha: Date,
    public numRecorrido: number,
    // public idTienda: number, // TODO Cambiar a Tienda
    // public idTortilleria: number, // TODO Cambiar a Tortilleria
    // public idRepartidor: number, // TODO Cambiar a Repartidor
  ) {}
}

export class Producto {
  constructor(
    public gramaje: number,
    public precio: number, // TODO: No viene en el diagrama, pero deberia
  ) {}
}
