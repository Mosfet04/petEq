import { Component, OnInit } from "@angular/core";
import { HealthService } from "../../../services/health.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  constructor(private healthService: HealthService) {}

  ngOnInit() {
    // O serviço de health já inicia automaticamente
  }
}
