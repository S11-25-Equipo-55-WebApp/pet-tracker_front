import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpecieService } from '../../../species/species.service';
import { RaceService } from '../../../race/race.service';
import { IRace } from '../../../race/interface/race.interface';
import { ISpecie } from '../../../species/interface/species.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";
import { MatSelect, MatOption } from "@angular/material/select";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IMascota } from '../../interface/mascota.interface';
import { PetService } from '../../pets.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-pets-list',
    templateUrl: './pet.form.html',
    styleUrls: ['./pet.form.css'],
    imports: [MatIcon,
        CommonModule,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        MatError,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PetForm implements OnInit {

    private readonly fb = inject(FormBuilder);
    private readonly specieService = inject(SpecieService);
    private readonly raceService = inject(RaceService);
    private readonly petService = inject(PetService);
    private readonly snackBar = inject(MatSnackBar);

    petsForm!: FormGroup;

    constructor(private router: Router) { }

    volver() {
        this.router.navigate(['/pets']);
    }

    nombre: string = " ";
    apellido: string = " ";

    selectedFile: File | null = null;
    uploadedUrl!: string;
    uploadedPublicId: string | null = null;


    // Signals para estado reactivo
    isLoading = signal(false);
    isSaving = signal(false);
    hasError = signal(false);
    errorMessage = signal('');


    // Signals para datos
    races = signal<IRace[]>([]);
    species = signal<ISpecie[]>([]);

    ngOnInit(): void {

        this.initForm();
        this.loadSpecies();
        this.loadRaces();

        this.nombre = localStorage.getItem('nombre') || '';
        this.apellido = localStorage.getItem('apellido') || '';
    }
    private initForm(): void {
        this.petsForm = this.fb.group({
            especieId: [null, [Validators.required]],
            razaId: [null, [Validators.required]],
            nombre: [null, [Validators.required]],
            fechaNacimiento: ['', [Validators.required]],
        });
    }

    private loadSpecies(): void {
        this.isLoading.set(true);
        this.specieService.getSpecies().subscribe({
            next: (specie) => {
                this.species.set(specie);
                this.isLoading.set(false);
            },
            error: (error) => {
                this.showError('Error al cargar las especies');
                this.isLoading.set(false);
            }
        });
    }

    private loadRaces(): void {
        this.isLoading.set(true);
        this.raceService.getRaces().subscribe({
            next: (race) => {
                this.races.set(race);
                this.isLoading.set(false);
            },
            error: (error) => {
                this.showError('Error al cargar las razas');
                this.isLoading.set(false);
            }
        });
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files?.length) {
            this.selectedFile = input.files[0];
        }
    }

    upload() {
        if (!this.selectedFile) return;

        this.petService.uploadFile(this.selectedFile).subscribe({
            next: (res) => {
                this.uploadedUrl = res.url;
                this.uploadedPublicId = res.publicId;

                alert("Se subió correctamente la imagen")
                console.log("Archivo subido:", res);
            },
            error: (err) => console.error(err)
        });
    }

    onSubmit(): void {
        if (this.petsForm.invalid) {
            this.petsForm.markAllAsTouched();
            this.showError('Por favor, complete todos los campos requeridos');
            return;
        }

        this.isSaving.set(true);

        const formValue = this.petsForm.value;

        const petData: IMascota = {
            codigo: 'DW-' + Date.now(), // Generar código único
            nombre: formValue.nombre,
            fechaNacimiento: this.formatDate(formValue.fechaNacimiento),
            especieId: formValue.especieId,
            razaId: formValue.razaId,
            fotoMascota: this.uploadedUrl,
            usuarioId: Number(localStorage.getItem('usuarioId')),
        };

        this.petService.createPet(petData).subscribe({
            next: () => {
                this.isSaving.set(false);
                this.showSuccess('Mascota registrada exitosamente');
                this.router.navigate(['/pets']);
            },
            error: (error) => {
                console.error('Error al guardar mascota:', error);
                this.isSaving.set(false);
                this.showError('Error al guardar la mascota');
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
        this.petsForm.reset();
    }

    get especieIdInvalid(): boolean {
        const control = this.petsForm.get('especieId');
        return !!(control?.invalid && control?.touched);
    }

    get razaIdInvalid(): boolean {
        const control = this.petsForm.get('razaId');
        return !!(control?.invalid && control?.touched);
    }

    get nombreInvalid(): boolean {
        const control = this.petsForm.get('nombre');
        return !!(control?.invalid && control?.touched);
    }

    get fechaNacimientoInvalid(): boolean {
        const control = this.petsForm.get('fechaNacimiento');
        return !!(control?.invalid && control?.touched);
    }
}
