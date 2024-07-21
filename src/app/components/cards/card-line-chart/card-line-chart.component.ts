import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: "app-card-line-chart",
  templateUrl: "./card-line-chart.component.html",
})
export class CardLineChartComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {
    const config: ChartConfiguration<'line', number[], string> = {
      type: "line",
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
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
          {
            label: (new Date().getFullYear() - 1).toString(),
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: [40, 68, 86, 74, 56, 60, 87],
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "white",
            },
            align: "end",
            position: "bottom",
          },
        },
        scales: {
          x: {
            ticks: {
              color: "rgba(255,255,255,.7)",
            },
            display: true,
            title: {
              display: false,
              text: "Month",
              color: "white",
            },
            grid: {
              display: false,
              //borderDash: [2],
              //borderDashOffset: [2],
              color: "rgba(33, 37, 41, 0.3)",
              //zeroLineColor: "rgba(0, 0, 0, 0)",
              //zeroLineBorderDash: [2],
              //zeroLineBorderDashOffset: [2],
            },
          },
          y: {
            ticks: {
              color: "rgba(255,255,255,.7)",
            },
            display: true,
            title: {
              display: false,
              text: "Value",
              color: "white",
            },
            grid: {
              //borderDash: [3],
              //borderDashOffset: [3],
              //drawBorder: false,
              color: "rgba(255, 255, 255, 0.15)",
              //zeroLineColor: "rgba(33, 37, 41, 0)",
              //zeroLineBorderDash: [2],
              //zeroLineBorderDashOffset: [2],
            },
          },
        },
      },
    };

    const ctx: any = document.getElementById("line-chart");
    new Chart(ctx, config);
  }
}
