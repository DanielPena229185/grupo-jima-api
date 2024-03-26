export function parseCantidad(cantidadParam: string): number {
    if(cantidadParam === undefined){ return 10; }
    let cantidad: number = parseInt(cantidadParam) || 0;
    if(cantidad < 0){ cantidad = 10; }
    if(cantidad > 100){ cantidad = 100; }
    return cantidad;
}