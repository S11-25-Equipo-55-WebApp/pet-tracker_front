export interface IDeworming {
    desparacitacionId?: number,
    codigo?: string,
    fechaAplicacion: string,
    fechaProxima: string,
    notas: string,
    mascotaId: number,
    tipoDesparacitacionId: number,
    tipoDesparacitacionNombre?: any,
}

export interface IDateDeworming {
    fecha: string,
    nombre : string
}