import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anillo-chart',
  templateUrl: './anillo-chart.component.html',
  styleUrls: ['./anillo-chart.component.scss']
})
export class AnilloChartComponent implements OnInit {

  public doughnutChartLabels = ['1 Estrella', '2 Estrellas', '3 estrellas', '4 Estrellas', '5 Estrellas'];
  public doughnutChartData = [120, 150, 180, 90, 200];
  public doughnutChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
