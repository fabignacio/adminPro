import { Component, Input } from '@angular/core';

/* IMPORTACIONES DE CHARTS */
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  /* TITULO */
  @Input('titulo') titulo: string = '';

  /* LABELS */
  @Input('labels') labels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  /* DATA */
  @Input('data') data: number[] = [350, 450, 100];

  /*TIPO GRAFICO */
  @Input('tipo') tipo: ChartType = 'doughnut';

  /* COLORES */
  @Input('colores') colores: string[] = ['#6857E6', '#009FEE', '#F02059'];

  public doughnutChartType!: ChartType;
  public doughnutChartData!: ChartData<'doughnut'>;

  ngOnInit() {
    this.doughnutChartType = this.tipo;

    /* DONA */
    this.doughnutChartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          backgroundColor: this.colores
        }
      ]
    };
  };

  // events
  chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  };

  chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  };

}
