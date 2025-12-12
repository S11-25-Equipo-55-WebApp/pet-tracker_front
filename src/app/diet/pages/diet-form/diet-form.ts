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

import { DietService } from '../../diet.service';
import { TypeFoodService } from '../../../typeFood/typeFood.service';
import { PetService } from '../../../pets/pets.service';
import { IDiet } from '../../interface/diet.interface';
import { ITypeFood } from '../../../typeFood/interface/typeFood.interface';
import { IMascota } from '../../../pets/interface/mascota.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diet-form',
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
  templateUrl: './diet-form.html',
  styleUrl: './diet-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DietForm implements OnInit {
  
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dietService = inject(DietService);
  private readonly typeFoodService = inject(TypeFoodService);
  private readonly petService = inject(PetService);
  private readonly route = inject(ActivatedRoute);

  dietForm!: FormGroup;

  idMascota! : number;
  
  // Signals para estado reactivo
  isLoading = signal(false);
  isSaving = signal(false);
  hasError = signal(false);
  errorMessage = signal('');
  
  // Signals para datos
  typeFoods = signal<ITypeFood[]>([]);
  pets = signal<IMascota[]>([]);

// Opciones de unidad de medida
  measurementUnits = signal([
    { id: 1, name: 'Gramos (g)' },
    { id: 2, name: 'Kilogramos (kg)' },
    { id: 3, name: 'Tazas' },
  ]);

  ngOnInit(): void {

    this.route.parent?.paramMap.subscribe(params => {
      this.idMascota = Number(params.get('id')!);

      this.initForm();
      this.loadTypeFoods();
    })
  }

  private initForm(): void {
    this.dietForm = this.fb.group({
      codigo: [""],
      porcionDia: [null, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]],
      notas: ["", [Validators.maxLength(500)]],
      tipoAlimentoId: [null, [Validators.required]],
      unidadMedidaId: [null, [Validators.required]]
    });
  }

  private loadTypeFoods(): void {
    this.isLoading.set(true);
    this.typeFoodService.getTypeFoods().subscribe({
      next: (types) => {
        this.typeFoods.set(types);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar tipos de alimento:', error);
        this.showError('Error al cargar tipos de alimento');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.dietForm.invalid) {
      this.dietForm.markAllAsTouched();
      this.showError('Por favor, complete todos los campos requeridos');
      return;
    }

    this.isSaving.set(true);

    const formValue = this.dietForm.value;
    
    const dietData: IDiet = {
      codigo: "DW-" + Date.now(),
      porcionDia: parseInt(formValue.porcionDia, 10),
      notas: formValue.notas || "",
      mascotaId: this.idMascota,
      tipoAlimentoId: formValue.tipoAlimentoId,
      unidadMedidaId: formValue.unidadMedidaId
    };

    console.log(' Datos que se enviarán al servidor:', dietData);
    console.log(' Valores del formulario:', formValue);

    this.dietService.createDiet(dietData).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.showSuccess('Dieta registrada exitosamente');
        this.router.navigate([`/pet-details/${this.idMascota}/ficha`]);
      },
      error: (error) => {
        console.log('Error al guardar dieta:', error);
        this.isSaving.set(false);
        this.showError('Error al guardar la dieta');
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

  goBack(): void {
    window.history.back();
  }

  resetForm(): void {
    this.dietForm.reset();
  }

  // Getters para validación en template
  get porcionDiaInvalid(): boolean {
    const control = this.dietForm.get('porcionDia');
    return !!(control?.invalid && control?.touched);
  }

  get mascotaIdInvalid(): boolean {
    const control = this.dietForm.get('mascotaId');
    return !!(control?.invalid && control?.touched);
  }

  get tipoAlimentoIdInvalid(): boolean {
    const control = this.dietForm.get('tipoAlimentoId');
    return !!(control?.invalid && control?.touched);
  }

  get unidadMedidaIdInvalid(): boolean {
    const control = this.dietForm.get('unidadMedidaId');
    return !!(control?.invalid && control?.touched);
  }
}
