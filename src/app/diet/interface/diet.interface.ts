    export interface IDiet{
    dietaId?: number,
    codigo: string,
    porcionDia: number,
    notas: string,
    mascotaId: number,
    tipoAlimentoId: number,
    unidadMedidaId: number
    tipoAlimentoNombre?: string
}

export interface IDietRequest {
    dtoDieta: IDiet
    unidadMedidaId: number,
}