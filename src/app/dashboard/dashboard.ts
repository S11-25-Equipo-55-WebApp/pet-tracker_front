import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AllCommunityModule, ModuleRegistry } from 'ag-charts-community';
import { AgChartsModule } from 'ag-charts-angular';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    AgChartsModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {

    // Opciones para gráfico de barras
  public chartOptions: AgChartOptions;

  // Opciones para gráfico de torta
  public pieOptions: AgChartOptions;

  constructor() {
    this.chartOptions = {
      
      data: [
        { date: 'Ene', actualWeight: 5.2, idealWeight: 5.0 },
        { date: 'Feb', actualWeight: 5.5, idealWeight: 5.0 },
        { date: 'Mar', actualWeight: 5.8, idealWeight: 5.0 },
        { date: 'Abr', actualWeight: 6.0, idealWeight: 5.0 },
      ],
            title: {
        text: 'Control de peso',
      },
      series: [
        {
          type: 'bar',
          xKey: 'date',
          yKey: 'actualWeight',
          yName: 'Peso Real (kg)',
        },
        {
          type: 'bar',
          xKey: 'date',
          yKey: 'idealWeight',
          yName: 'Peso Ideal (kg)',
        },
      ],
    };

    this.pieOptions = {
      data: getPetCarePercentages(),
      title: {
        text: 'Cuidado de la Mascota',
      },
      series: [
        {
          type: 'pie',
          angleKey: 'porcentaje',
          legendItemKey: 'categoria',
          calloutLabelKey: 'categoria',   // etiqueta fuera del gráfico
          sectorLabelKey: 'porcentaje',   // etiqueta dentro del gráfico
          fills: ['#4CAF50', '#FFC107', '#2196F3'], // colores personalizados
        },
      ],
    };
  }
}

export function getPetCarePercentages() {
  return [
    { categoria: 'Alimentación', porcentaje: 40 },
    { categoria: 'Vacunas', porcentaje: 30 },
    { categoria: 'Desparasitaciones', porcentaje: 30 },
  ];
}
