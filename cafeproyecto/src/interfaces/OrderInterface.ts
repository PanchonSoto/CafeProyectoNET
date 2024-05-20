export interface CreateOrder{
    ordenId?: number,
    usuarioId: string,
    productoId: number,
    precio: number,
    cantidad: number,
    fechaOrden?: Date
}