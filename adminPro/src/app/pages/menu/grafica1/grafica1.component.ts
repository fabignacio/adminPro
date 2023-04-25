import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  labels1: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  labels2: string[] = ['Marzo', 'Abril', 'Mayo'];
  labels3: string[] = ['The Last Of Us', 'The Last Of Us 2', 'God Of War Ragnarok'];
  labels4: string[] = ['Junio', 'Julio', 'Agosto'];

  data1: number[] = [350, 450, 100];
  data2: number[] = [900, 1500, 650];
  data3: number[] = [2500, 3500, 1000];
  data4: number[] = [400, 120, 30];

  colores1: string[] = ['#6857E6', '#009FEE', '#F02059'];
  colores2: string[] = ['#FD2C02', '#6C1301', '#553E39'];
  colores3: string[] = ['#01FBA7', '#00422C', '#72BDA5'];
  colores4: string[] = ['#27FC01', '#63F14A', '#B2F5A6'];

};
