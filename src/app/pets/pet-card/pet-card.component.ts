import { Component, Input } from '@angular/core';
import { IMascota } from '../interface/mascota.interface';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css'],
  imports: [MatIcon]
})
export class PetCardComponent {
  @Input() pet!: IMascota;
}

