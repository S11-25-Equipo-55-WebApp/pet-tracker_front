import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMascota } from '../interface/mascota.interface';
import { MatIcon } from "@angular/material/icon";
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css']
})
export class PetCardComponent {

  constructor(private router: Router) {}

  @Input() pet!: IMascota;                 // 👈 recibe la mascota desde *ngFor
  @Output() clickCard = new EventEmitter<number>(); // 👈 enviará mascotaId

  verDetalle() {
    if (!this.pet?.mascotaId)
       return;
    this.clickCard.emit(this.pet.mascotaId); // 🔥 devuelve el ID al padre

     this.router.navigate(['/pet-details', this.pet.mascotaId]);  // VER ESTO

    console.log(this.pet.mascotaId)  
  }
}
