import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: "app-card-bar-chart",
  templateUrl: "./card-bar-chart.component.html",
})
export class CardBarChartComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {
    const config: ChartConfiguration<'bar', number[], string> = {
      type: 'bar',
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: new Date().getFullYear().toString(),
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: [30, 78, 56, 34, 100, 45, 13],
            barThickness: 8,
          },
          {
            label: (new Date().getFullYear() - 1).toString(),
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [27, 68, 86, 74, 10, 4, 87],
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "rgba(0,0,0,.4)",
            },
            align: "end",
            position: "bottom",
          },
        },
        scales: {
          x: {
            display: false,
            title: {
              display: true,
              text: "Month",
            },
            grid: {
              display: false,
            },
          },
          y: {
            display: true,
            title: {
              display: false,
              text: "Value",
            },
            grid: {
              display: true,
              color: "rgba(33, 37, 41, 0.2)",
              //borderColor: "rgba(33, 37, 41, 0.15)", // Use 'borderColor' instead of 'zeroLineColor'
              //borderDash: [2],
              //drawBorder: false,
              //borderDashOffset: [2],
            },
          },
        },
      },
    };

    const ctx: any = document.getElementById("bar-chart");
    new Chart(ctx, config);
  }
}
