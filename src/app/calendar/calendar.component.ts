import { AfterViewInit, Component, Inject, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCalendarBody, MatCalendar } from '@angular/material/datepicker';
import { MatCardModule, MatCard } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewEncapsulation } from '@angular/core';


@NgModule({
  imports: [
    MatDialogModule,
    MatCalendarBody,
    MatCardModule,
    MatButtonModule,
  ]
})
export class AppModule { }


@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css', // plural
  encapsulation: ViewEncapsulation.None,
  imports: [MatCalendar],
  providers: [
    provideNativeDateAdapter()  // también sirve solo para este componente
  ]
})

export class CalendarDialogComponent implements AfterViewInit {
  selectedDate: Date | null = null;

  vacunas: { fecha: Date; nombre: string; }[] = [];
  desparacitaciones: { fecha: Date; nombre: string; }[] = [];

  constructor(
    public dialogRef: MatDialogRef<CalendarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.vacunas = data.vacunas.map((v: any) => {
      return {
        fecha: new Date(v.fecha + 'T03:00:00.00Z'),
        nombre: v.nombre
      }
    })

    this.desparacitaciones = data.desparacitaciones.map((v: any) => {
      var fecha = new Date(v.fecha + 'T03:00:00.00Z');

      return {
        fecha: fecha,
        nombre: v.nombre
      }
    })
  }

  setDatesClass = (date: Date) => {
    const d = new Date(date).setHours(0, 0, 0, 0);

    const esVacuna = this.vacunas.some(v => v.fecha.setHours(0, 0, 0, 0) === d);
    const esDespa = this.desparacitaciones.some(v => v.fecha.setHours(0, 0, 0, 0) === d);

    if (esVacuna && esDespa) return 'vacuna-desparacitacion'; // ambos eventos
    if (esVacuna) return 'vacuna-day';
    if (esDespa) return 'desparacitacion-day';
    return '';
  }

  close() {
    this.dialogRef.close(this.selectedDate);
  }


  ngAfterViewInit() {
    setTimeout(() => {
      const cells = document.querySelectorAll('.mat-calendar-body-cell-content');

      cells.forEach(cell => {
        const day = Number(cell.textContent);

        const vacuna = this.vacunas.find(v => v.fecha.getDate() === day);
        const despa = this.desparacitaciones.find(v => v.fecha.getDate() === day);

        let tooltip = '';
        if (vacuna) tooltip += `${vacuna.nombre}`;
        if (despa) tooltip += (tooltip ? '\n' : '') + `${despa.nombre}`;

        if (tooltip) cell.setAttribute('title', tooltip);
      });
    }, 200);
  }
}