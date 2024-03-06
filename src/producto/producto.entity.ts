
export class Producto {
    id: string;
    tienda: Tienda;
    cantidad: number;
    gramaje: number;
}

class Tienda {
    id: string;
    nombre: string;
}