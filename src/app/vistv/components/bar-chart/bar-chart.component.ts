import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {


  constructor() { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Abril','Mayo', 'Junio', 'Julio'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [2, 5, 20, 55], label: 'Busquedas'},
    {data: [0, 1, 5, 8], label: 'Calificaciones'}
  ];

  ngOnInit() {
  }


}

