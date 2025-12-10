import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
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
import { MatDialog } from '@angular/material/dialog';
import { CalendarDialogComponent } from '../../calendar/calendar.component';
import { FichaMascota } from "../../ficha-mascota/fichaMascota.component";


@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [MatIcon, CommonModule, FichaMascota, RouterOutlet],
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

  dateVaccines: IDateVaccine[] = [];
  dateDewormins: IDateDeworming[] = [];

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
    private router: Router,
    private dialog: MatDialog

  ) { }

  volver() {
    this.router.navigate(['/pets']);
  }

  vaccineForm() {
    this.router.navigate([`/pet-details/${this.idMascota}/vaccine`]);
  }

  dewormingForm() {
    this.router.navigate([`/pet-details/${this.idMascota}/deworming`]);
  }

  abrirCalendario() {
    const dialogRef = this.dialog.open(CalendarDialogComponent, {
      width: '320px',
      data: {
        vacunas: this.dateVaccines,
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
    const idMascota = Number(this.route.snapshot.paramMap.get('id'));

    this.nombre = localStorage.getItem('nombre') || '';
    this.apellido = localStorage.getItem('apellido') || '';

    this.petService.getPetById(idMascota).subscribe({
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
}