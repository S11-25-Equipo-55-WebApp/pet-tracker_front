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

import { VaccineService } from '../../vaccine.service';
import { TypeVaccineService } from '../../../typeVaccine/typeVaccine.service';
import { PetService } from '../../../pets/pets.service';
import { IVaccine } from '../../interface/vaccine.interface';
import { ITypeVaccine } from '../../../typeVaccine/interface/typeVaccine.interface';
import { IMascota } from '../../../pets/interface/mascota.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vaccine-form',
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
  templateUrl: './vaccine-form.html',
  styleUrl: './vaccine-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VaccineForm implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly vaccineService = inject(VaccineService);
  private readonly typeVaccineService = inject(TypeVaccineService);
  private readonly petService = inject(PetService);
  private readonly route = inject(ActivatedRoute);

  vaccineForm!: FormGroup;

  idMascota!: number;

  // Signals para estado reactivo
  isLoading = signal(false);
  isSaving = signal(false);
  hasError = signal(false);
  errorMessage = signal('');

  // Signals para datos
  typeVaccines = signal<ITypeVaccine[]>([]);
  pets = signal<IMascota[]>([]);

  ngOnInit(): void {

    this.route.parent?.paramMap.subscribe(params => {
      this.idMascota = Number(params.get('id')!);

      this.initForm();
      this.loadTypeVaccines();
    })
  }

  private initForm(): void {
    this.vaccineForm = this.fb.group({
      codigo: [''],
      fechaAplicacion: ['', [Validators.required]],
      fechaProxima: ['', [Validators.required]],
      notas: ['', [Validators.maxLength(500)]],
      //mascotaId: [null, [Validators.required]],
      tipoVacunaId: [null, [Validators.required]]
    });
  }

  private loadTypeVaccines(): void {
    this.isLoading.set(true);
    this.typeVaccineService.getTypeVaccine().subscribe({
      next: (types) => {
        this.typeVaccines.set(types);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar tipos de vacuna:', error);
        this.showError('Error al cargar tipos de vacuna');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.vaccineForm.invalid) {
      this.vaccineForm.markAllAsTouched();
      this.showError('Por favor, complete todos los campos requeridos');
      return;
    }

    this.isSaving.set(true);

    const formValue = this.vaccineForm.value;

    const vaccineData: IVaccine = {
      codigo: '',
      fechaAplicacion: this.formatDate(formValue.fechaAplicacion),
      fechaProxima: this.formatDate(formValue.fechaProxima),
      notas: formValue.notas || '',
      mascotaId: this.idMascota,
      tipoVacunaId: formValue.tipoVacunaId
    };

    this.vaccineService.createVaccine(vaccineData).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.showSuccess('Vacuna registrada exitosamente');
        this.router.navigate(['/vaccines']);
      },
      error: (error) => {
        console.error('Error al guardar vacuna:', error);
        this.isSaving.set(false);
        this.showError('Error al guardar la vacuna');
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

  goBack(): void {
    window.history.back();
  }

  resetForm(): void {
    this.vaccineForm.reset();
  }

  // Getters para validación en template
  get fechaAplicacionInvalid(): boolean {
    const control = this.vaccineForm.get('fechaAplicacion');
    return !!(control?.invalid && control?.touched);
  }

  get fechaProximaInvalid(): boolean {
    const control = this.vaccineForm.get('fechaProxima');
    return !!(control?.invalid && control?.touched);
  }

  get mascotaIdInvalid(): boolean {
    const control = this.vaccineForm.get('mascotaId');
    return !!(control?.invalid && control?.touched);
  }

  get tipoVacunaIdInvalid(): boolean {
    const control = this.vaccineForm.get('tipoVacunaId');
    return !!(control?.invalid && control?.touched);
  }
}
