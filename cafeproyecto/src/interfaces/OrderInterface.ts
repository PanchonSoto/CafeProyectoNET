export interface CreateOrder{
    ordenId?: number,
    usuarioId: string,
    productoId: number,
    precio: number,
    cantidad: number,
    fechaOrden?: Date
}

export interface UserOrders {
    ordenId: number,
    usuarioId: string,
    productoId: number,
    precio: number,
    cantidad: number,
    fechaOrden: string,
    nombreProducto: string,
    descripcionProducto: string,
    imagenUrl: string
}