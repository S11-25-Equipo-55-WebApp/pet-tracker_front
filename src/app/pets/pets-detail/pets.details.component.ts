import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../pets.service';
import { SpecieService } from '../../species/species.service';
import { RaceService } from '../../race/race.service';
import { MatIcon } from "@angular/material/icon";
import { IDateVaccine, IVaccine } from '../../vaccine/interface/vaccine.interface';
import { VaccineService } from '../../vaccine/vaccine.service';
import { CommonModule } from '@angular/common';
import { TypeVaccineService } from '../../typeVaccine/typeVaccine.service';
import { DewormingService } from '../../deworming/deworming.service';
import { TypeDewormingService } from '../../typeDeworming/typeDeworming.service';
import { IDateDeworming, IDeworming } from '../../deworming/interface/deworming.interface';
import { DietService } from '../../diet/diet.service';
import { IDiet } from '../../diet/interface/diet.interface';
import { TypeFoodService } from '../../typeFood/typeFood.service';
import { MedicationService } from '../../medication/medication.service';
import { TypeMedicationService } from '../../typeMedication/typeMedication.service';
import { IMedication } from '../../medication/interface/medication.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CalendarDialogComponent } from '../../calendar/calendar.component';


@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [MatIcon, CommonModule],
  templateUrl: './pets.details.component.html',
  styleUrls: ['./pets.details.component.css']
})

export class PetsDetailsComponent implements OnInit {

  pet: any;
  specie: any;
  specieId!: number;
  race: any;
  raceId!: number;

  vaccines: IVaccine[] = [];
  dewormings: IDeworming[] = [];
  diets: IDiet[] = [];
  medications: IMedication[] = [];

  dateVaccines : IDateVaccine [] = [];
  dateDewormins : IDateDeworming [] = [];

  nombre = "";
  apellido = "";
  idMascota!: number;

  capitalizado = "";
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private specieService: SpecieService,
    private raceService: RaceService,
    private vaccineService: VaccineService,
    private typeVaccineService: TypeVaccineService,
    private dewormingService: DewormingService,
    private typeDewormingService: TypeDewormingService,
    private dietService: DietService,
    private typeDietService: TypeFoodService,
    private medicationService : MedicationService,
    private typeMedicationService : TypeMedicationService,
    private router: Router,
    private dialog: MatDialog

  ) {}

volver(){
  this.router.navigate(['/pets']);
}

abrirCalendario() {
  const dialogRef = this.dialog.open(CalendarDialogComponent, {    
    width: '320px',
     data: { vacunas: this.dateVaccines,
            desparacitaciones: this.dateDewormins
          }

    });
  dialogRef.afterClosed().subscribe((fechaSeleccionada: Date | null) => {
    if (fechaSeleccionada) {
      console.log('Fecha seleccionada:', fechaSeleccionada);
    }
  });
}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.nombre = localStorage.getItem('nombre') || '';
    this.apellido = localStorage.getItem('apellido') || '';

    this.petService.getPetById(id).subscribe({
      next: (res) => {
        this.pet = res;

        this.capitalizado = this.pet.nombre.charAt(0).toUpperCase() + this.pet.nombre.slice(1);
        this.specieId = this.pet.especieId;
        this.raceId = this.pet.razaId;
        this.idMascota = this.pet.mascotaId;

        this.cargarEspecie(this.specieId);
        this.cargarRaza(this.raceId);
        this.vaccinesByPetId(this.idMascota);
        this.DewormingsByPetId(this.idMascota);
        this.DietByPetId(this.idMascota);
        this.MedicationsByPetId(this.idMascota);
      }
    });    
  }

  cargarEspecie(id: number) {
    this.specieService.getSpecieById(id).subscribe(res => this.specie = res);
  }

  cargarRaza(id: number) {
    this.raceService.getRaceById(id).subscribe(res => this.race = res);
  }

vaccinesByPetId(id: number) {
  this.dateVaccines = [];

  this.vaccineService.getVaccineByIdPet(id).subscribe({
    next: (data) => {
      this.vaccines = data;
      this.cargando = false;

      this.vaccines.forEach(v => {
        this.typeVaccineService.getTypeVaccineById(v.tipoVacunaId)
          .subscribe(tipo => {
            v.tipoVacunaNombre = tipo.nombre;
            
            this.dateVaccines.push({
              fecha: v.fechaProxima,
              nombre: tipo.nombre
            });
          });
      });
    },
    error: () => this.cargando = false
  });
}

DewormingsByPetId(id: number) {
  this.dewormingService.getDewormingByIdPet(id).subscribe({
    next: (data) => {
      this.dewormings = data;
      this.cargando = false;

      data.forEach(v => {
        this.typeDewormingService.getTypeDewormingById(v.tipoDesparacitacionId)
          .subscribe(tipo => {
            v.tipoDesparacitacionNombre = tipo.nombre;

            const soloFecha = v.fechaProxima.toString().split('T')[0];

            this.dateDewormins.push({
              fecha: soloFecha,
              nombre: tipo.nombre              
            });
          });
      });
    },
    error: () => this.cargando = false
  });
}

  DietByPetId(id: number) {
    this.dietService.getDietByIdPet(id).subscribe({
      next: (data) => {
        this.diets = data;
        this.cargando = false;

        this.diets.forEach(v => {
          this.typeDietService.getTypeFoodById(v.tipoAlimentoId)
            .subscribe(tipo => v.tipoAlimentoNombre= tipo.nombre);
        });
      },
      error: () => this.cargando = false
    });
  }

  MedicationsByPetId(id: number) {
    this.medicationService.getMedicationByPetId(id).subscribe({
      next: (data) => {
        this.medications = data;
        this.cargando = false;

        this.medications.forEach(v => {
          this.typeMedicationService.getTypeMedicationById(v.tipoMedicacionId)
            .subscribe(tipo => v.tipoMedicacionNombre= tipo.nombre);
        });
      },
      error: () => this.cargando = false
    });
  }
}