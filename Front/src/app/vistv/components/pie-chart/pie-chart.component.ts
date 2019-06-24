import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  public pieChartLabels = ['Tacos al Pastor', 'Tacos de Barbacoa', 'Tacos Surtidos'];
  public pieChartData = [25, 20, 8];
  public pieChartType = 'pie';

  constructor() { }

  ngOnInit() {
  }

}
