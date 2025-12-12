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

import { DewormingService } from '../../deworming.service';
import { TypeDewormingService } from '../../../typeDeworming/typeDeworming.service';
import { PetService } from '../../../pets/pets.service';
import { IDeworming } from '../../interface/deworming.interface';
import { ITypeDeworming } from '../../../typeDeworming/interface/typeDeworming.interface';
import { IMascota } from '../../../pets/interface/mascota.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dworming-form',
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
  templateUrl: './dworming-form.html',
  styleUrl: './dworming-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DwormingForm implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dewormingService = inject(DewormingService);
  private readonly typeDewormingService = inject(TypeDewormingService);
  private readonly petService = inject(PetService);
  private readonly route = inject(ActivatedRoute);

  dewormingForm!: FormGroup;

  idMascota!: number;

  // Signals para estado reactivo
  isLoading = signal(false);
  isSaving = signal(false);
  hasError = signal(false);
  errorMessage = signal('');

  // Signals para datos
  typeDewormings = signal<ITypeDeworming[]>([]);
  pets = signal<IMascota[]>([]);

  ngOnInit(): void {

    this.route.parent?.paramMap.subscribe(params => {
      this.idMascota = Number(params.get('id')!);

      this.initForm();
      this.loadTypeDewormings();
    })
  }

  private initForm(): void {
    this.dewormingForm = this.fb.group({
      tipoDesparacitacionId: [null, [Validators.required]],
      fechaAplicacion: ['', [Validators.required]],
      fechaProxima: ['', [Validators.required]],
      notas: ['', [Validators.maxLength(500)]]
    });
  }

  private loadTypeDewormings(): void {
    this.isLoading.set(true);
    this.typeDewormingService.getTypeDeworming().subscribe({
      next: (types) => {
        this.typeDewormings.set(types);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar tipos de desparasitación:', error);
        this.showError('Error al cargar tipos de desparasitación');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.dewormingForm.invalid) {
      this.dewormingForm.markAllAsTouched();
      this.showError('Por favor, complete todos los campos requeridos');
      return;
    }

    this.isSaving.set(true);

    const formValue = this.dewormingForm.value;

    const dewormingData: IDeworming = {
      codigo: 'DW-' + Date.now(), // Generar código único
      fechaAplicacion: this.formatDate(formValue.fechaAplicacion),
      fechaProxima: this.formatDate(formValue.fechaProxima),
      notas: formValue.notas || '',
      mascotaId: this.idMascota, // Ahora viene del formulario
      tipoDesparacitacionId: formValue.tipoDesparacitacionId
    };

    console.log('📤 Enviando datos de desparasitación:', dewormingData);

    this.dewormingService.createDeworming(dewormingData).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.showSuccess('Desparasitación registrada exitosamente');
        this.router.navigate([`/pet-details/${this.idMascota}/ficha`]);
      },
      error: (error) => {
        console.error('❌ Error al guardar desparasitación:', error);
        this.isSaving.set(false);
        this.showError('Error al guardar la desparasitación');
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
    this.dewormingForm.reset();
  }

  goBack(): void {
    window.history.back();
  }

  // Getters para validación en template
  get mascotaIdInvalid(): boolean {
    const control = this.dewormingForm.get('mascotaId');
    return !!(control?.invalid && control?.touched);
  }

  get tipoDesparacitacionIdInvalid(): boolean {
    const control = this.dewormingForm.get('tipoDesparacitacionId');
    return !!(control?.invalid && control?.touched);
  }

  get fechaAplicacionInvalid(): boolean {
    const control = this.dewormingForm.get('fechaAplicacion');
    return !!(control?.invalid && control?.touched);
  }

  get fechaProximaInvalid(): boolean {
    const control = this.dewormingForm.get('fechaProxima');
    return !!(control?.invalid && control?.touched);
  }
}