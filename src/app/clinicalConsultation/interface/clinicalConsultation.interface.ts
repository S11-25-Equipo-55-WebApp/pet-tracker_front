export interface IClinicalConsultation {
    consultaClinicaId?: number,
    codigo?: string,
    fechaConsulta: string,
    motivo: string,
    diagnostico: string,
    veterinario: string,
    notas: string,
    mascotaId: number
}