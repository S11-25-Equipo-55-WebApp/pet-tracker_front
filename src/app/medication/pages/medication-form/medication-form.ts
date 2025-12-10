import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MedicationService } from '../../medication.service';
import { TypeMedicationService } from '../../../typeMedication/typeMedication.service';
import { ClinicalConsultationService } from '../../../clinicalConsultation/clinicalConsultation.service';
import { IMedication } from '../../interface/medication.interface';
import { ITypeMedication } from '../../../typeMedication/interface/typeMedication.interface';
import { IClinicalConsultation } from '../../../clinicalConsultation/interface/clinicalConsultation.interface';

@Component({
  selector: 'app-medication-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './medication-form.html',
  styleUrl: './medication-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicationForm implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly medicationService = inject(MedicationService);
  private readonly typeMedicationService = inject(TypeMedicationService);
  private readonly clinicalConsultationService = inject(ClinicalConsultationService);

  medicationForm!: FormGroup;

  // Signals para estado reactivo
  isLoading = signal(false);
  isSaving = signal(false);
  hasError = signal(false);
  errorMessage = signal('');

  // Signals para datos
  typeMedications = signal<ITypeMedication[]>([]);
  consultations = signal<IClinicalConsultation[]>([]);

  ngOnInit(): void {
    this.initForm();
    this.loadTypeMedications();
    this.loadConsultations();
  }

  private initForm(): void {
    this.medicationForm = this.fb.group({
      consultaId: [null, [Validators.required]],
      tipoMedicacionId: [null, [Validators.required]],
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      frecuencia: ['', [Validators.required, Validators.min(1)]],
      descripcion: ['', [Validators.maxLength(500)]]
    });
  }

  private loadTypeMedications(): void {
    this.isLoading.set(true);
    this.typeMedicationService.getTypeMedications().subscribe({
      next: (types) => {
        this.typeMedications.set(types);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar tipos de medicación:', error);
        this.showError('Error al cargar tipos de medicación');
        this.isLoading.set(false);
      }
    });
  }

  private loadConsultations(): void {
    this.clinicalConsultationService.getClinicalConsultation().subscribe({
      next: (consultations) => {
        console.log('Consultas cargadas:', consultations);
        this.consultations.set(consultations);
      },
      error: (error) => {
        console.error('Error al cargar consultas:', error);
        this.showError('Error al cargar consultas');
      }
    });
  }

  onSubmit(): void {
    if (this.medicationForm.invalid) {
      this.medicationForm.markAllAsTouched();
      this.showError('Por favor, complete todos los campos requeridos');
      return;
    }

    this.isSaving.set(true);

    const formValue = this.medicationForm.value;

    const medicationData: IMedication = {
      codigo: 'MED-' + Date.now(), // Generar código único
      nombre: formValue.nombre,
      frecuencia: formValue.frecuencia,
      descripcion: formValue.descripcion || '',
      consultaId: formValue.consultaId,
      tipoMedicacionId: formValue.tipoMedicacionId
    };

    console.log('📤 Enviando datos de medicación:', medicationData);

    this.medicationService.createMedication(medicationData).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.showSuccess('Medicación registrada exitosamente');
        this.router.navigate(['/medication']);
      },
      error: (error) => {
        console.error('❌ Error al guardar medicación:', error);
        this.isSaving.set(false);
        this.showError('Error al guardar la medicación');
      }
    });
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
    this.medicationForm.reset();
  }

  goBack(): void {
    window.history.back();
  }

  // Getters para validación en template
  get consultaIdInvalid(): boolean {
    const control = this.medicationForm.get('consultaId');
    return !!(control?.invalid && control?.touched);
  }

  get tipoMedicacionIdInvalid(): boolean {
    const control = this.medicationForm.get('tipoMedicacionId');
    return !!(control?.invalid && control?.touched);
  }

  get nombreInvalid(): boolean {
    const control = this.medicationForm.get('nombre');
    return !!(control?.invalid && control?.touched);
  }

  get frecuenciaInvalid(): boolean {
    const control = this.medicationForm.get('frecuencia');
    return !!(control?.invalid && control?.touched);
  }
}
