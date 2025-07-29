import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { HealthService, HealthSummary } from "../../../services/health.service";

@Component({
  selector: "app-header-stats",
  templateUrl: "./header-stats.component.html",
})
export class HeaderStatsComponent implements OnInit, OnDestroy {
  healthSummary: HealthSummary | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private healthService: HealthService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.healthService.healthStatus$.subscribe(summary => {
        this.healthSummary = summary;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getOverallStatusText(): string {
    if (!this.healthSummary) return 'Verificando...';
    switch (this.healthSummary.overallStatus) {
      case 'healthy': return 'Saudável';
      case 'warning': return 'Atenção';
      case 'critical': return 'Crítico';
      default: return 'Desconhecido';
    }
  }

  getOverallStatusPercent(): string {
    if (!this.healthSummary) return '0';
    switch (this.healthSummary.overallStatus) {
      case 'healthy': return '100';
      case 'warning': return '75';
      case 'critical': return '25';
      default: return '0';
    }
  }

  getOverallStatusColor(): string {
    if (!this.healthSummary) return 'text-gray-500';
    switch (this.healthSummary.overallStatus) {
      case 'healthy': return 'text-emerald-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  }

  getDbResponseTime(): string {
    if (!this.healthSummary) return '0';
    return this.healthSummary.systemHealth.database.responseTime.toString();
  }

  getDbResponsePercent(): string {
    if (!this.healthSummary) return '0';
    const responseTime = this.healthSummary.systemHealth.database.responseTime;
    if (responseTime <= 50) return '25';
    if (responseTime <= 100) return '15';
    if (responseTime <= 200) return '10';
    return '5';
  }

  getDbResponseColor(): string {
    if (!this.healthSummary) return 'text-gray-500';
    const responseTime = this.healthSummary.systemHealth.database.responseTime;
    if (responseTime <= 50) return 'text-emerald-500';
    if (responseTime <= 100) return 'text-yellow-500';
    return 'text-red-500';
  }

  getCpuUsage(): string {
    if (!this.healthSummary) return '0';
    return this.healthSummary.systemHealth.cpu.usage.toFixed(1);
  }

  getCpuPercent(): string {
    if (!this.healthSummary) return '0';
    const usage = this.healthSummary.systemHealth.cpu.usage;
    if (usage < 50) return '15';
    if (usage < 80) return '8';
    return '3';
  }

  getCpuColor(): string {
    if (!this.healthSummary) return 'text-gray-500';
    const usage = this.healthSummary.systemHealth.cpu.usage;
    if (usage < 50) return 'text-emerald-500';
    if (usage < 80) return 'text-yellow-500';
    return 'text-red-500';
  }

  getMemoryUsage(): string {
    if (!this.healthSummary) return '0';
    return this.healthSummary.systemHealth.memory.usage.toFixed(1);
  }

  getMemoryPercent(): string {
    if (!this.healthSummary) return '0';
    const usage = this.healthSummary.systemHealth.memory.usage;
    if (usage < 60) return '20';
    if (usage < 80) return '12';
    return '5';
  }

  getMemoryColor(): string {
    if (!this.healthSummary) return 'text-gray-500';
    const usage = this.healthSummary.systemHealth.memory.usage;
    if (usage < 60) return 'text-emerald-500';
    if (usage < 80) return 'text-yellow-500';
    return 'text-red-500';
  }
}
