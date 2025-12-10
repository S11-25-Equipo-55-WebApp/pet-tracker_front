  export interface IVaccine {
    vacunaId?: number,
    codigo: string,
    fechaAplicacion: string,
    fechaProxima: string,
    notas: string,
    mascotaId: number,
    tipoVacunaId: number,
    tipoVacunaNombre? : string
}

export interface IDateVaccine{
  fecha: string,
  nombre: string,
}