export interface IMedication {
    medicacionId?: number,
    codigo: string,
    nombre: string,
    frecuencia: number,
    descripcion: string,
    consultaId: number,
    tipoMedicacionId: number
}