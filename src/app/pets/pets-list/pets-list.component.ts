import { Component, OnInit } from '@angular/core';
import { PetService } from '../pets.service';
import { IMascota } from '../interface/mascota.interface';
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PetCardComponent } from "../pet-card/pet-card.component";

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.css'],
  imports: [MatIcon, CommonModule, PetCardComponent]
})
export class PetsListComponent implements OnInit {

  pets: IMascota[] = [];
  isLoading: boolean = true;

  constructor(private petService: PetService,
    private router: Router) { }

  verDetalle(id: number) {
    this.router.navigate(['/pet-details', id]);
  }

  nombre: string = " ";
  apellido: string = " ";

  ngOnInit(): void {


    //this.isLoading = false;

    this.nombre = localStorage.getItem('nombre') || '';
    this.apellido = localStorage.getItem('apellido') || '';

    const userId = Number(localStorage.getItem('usuarioId')); // ajusta según tu auth
    this.petService.getPetByIdUser(userId).subscribe({
      next: (res) => {
        this.pets = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
