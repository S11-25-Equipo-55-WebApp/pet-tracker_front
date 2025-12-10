import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ClinicalConsultationService } from '../../clinicalConsultation.service';
import { PetService } from '../../../pets/pets.service';
import { IClinicalConsultation } from '../../interface/clinicalConsultation.interface';
import { IMascota } from '../../../pets/interface/mascota.interface';

@Component({
  selector: 'app-clinical-consultation',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './clinical-consultation.html',
  styleUrl: './clinical-consultation.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicalConsultation implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly clinicalConsultationService = inject(ClinicalConsultationService);
  private readonly petService = inject(PetService);

  consultationForm!: FormGroup;

  // Signals para estado reactivo
  isLoading = signal(false);
  isSaving = signal(false);
  hasError = signal(false);
  errorMessage = signal('');

  // Signals para datos
  pets = signal<IMascota[]>([]);

  ngOnInit(): void {
    this.initForm();
    this.loadPets();
  }

  private initForm(): void {
    this.consultationForm = this.fb.group({
      mascotaId: [null, [Validators.required]],
      fechaConsulta: ['', [Validators.required]],
      motivo: ['', [Validators.required, Validators.maxLength(200)]],
      diagnostico: ['', [Validators.required, Validators.maxLength(300)]],
      veterinario: ['', [Validators.required, Validators.maxLength(100)]],
      notas: ['', [Validators.maxLength(500)]]
    });
  }

  private loadPets(): void {
    this.isLoading.set(true);
    this.petService.getPets().subscribe({
      next: (pets) => {
        console.log('Mascotas cargadas:', pets);
        this.pets.set(pets);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar mascotas:', error);
        this.showError('Error al cargar mascotas');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.consultationForm.invalid) {
      this.consultationForm.markAllAsTouched();
      this.showError('Por favor, complete todos los campos requeridos');
      return;
    }

    this.isSaving.set(true);

    const formValue = this.consultationForm.value;

    const consultationData: IClinicalConsultation = {
      codigo: 'CC-' + Date.now(), // Generar código único
      fechaConsulta: this.formatDate(formValue.fechaConsulta),
      motivo: formValue.motivo,
      diagnostico: formValue.diagnostico,
      veterinario: formValue.veterinario,
      notas: formValue.notas || '',
      mascotaId: formValue.mascotaId
    };

    console.log('📤 Enviando datos de consulta clínica:', consultationData);

    this.clinicalConsultationService.createClinicalConsultation(consultationData).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.showSuccess('Consulta clínica registrada exitosamente');
        this.router.navigate(['/clinical-consultation']);
      },
      error: (error) => {
        console.error('❌ Error al guardar consulta clínica:', error);
        this.isSaving.set(false);
        this.showError('Error al guardar la consulta clínica');
      }
    });
  }

  private formatDate(date: Date | string): string {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    return date;
  }

  private showError(message: string): void {
    this.hasError.set(true);
    this.errorMessage.set(message);
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
    setTimeout(() => this.hasError.set(false), 3000);
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  resetForm(): void {
    this.consultationForm.reset();
  }

  goBack(): void {
    window.history.back();
  }

  // Getters para validación en template
  get mascotaIdInvalid(): boolean {
    const control = this.consultationForm.get('mascotaId');
    return !!(control?.invalid && control?.touched);
  }

  get fechaConsultaInvalid(): boolean {
    const control = this.consultationForm.get('fechaConsulta');
    return !!(control?.invalid && control?.touched);
  }

  get motivoInvalid(): boolean {
    const control = this.consultationForm.get('motivo');
    return !!(control?.invalid && control?.touched);
  }

  get diagnosticoInvalid(): boolean {
    const control = this.consultationForm.get('diagnostico');
    return !!(control?.invalid && control?.touched);
  }

  get veterinarioInvalid(): boolean {
    const control = this.consultationForm.get('veterinario');
    return !!(control?.invalid && control?.touched);
  }
}
