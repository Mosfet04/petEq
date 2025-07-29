import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, interval } from 'rxjs';
import { HealthService, DetailedHealthStatus } from '../../../services/health.service';

@Component({
  selector: "app-card-performance-metrics",
  templateUrl: "./card-performance-metrics.component.html",
})
export class CardPerformanceMetricsComponent implements OnInit, OnDestroy {
  healthData: DetailedHealthStatus | null = null;
  private subscription: Subscription = new Subscription();
  
  constructor(public healthService: HealthService) {}

  ngOnInit(): void {
    // Atualiza métricas a cada 15 segundos
    this.subscription.add(
      interval(15000).subscribe(() => {
        this.loadHealthMetrics();
      })
    );
    
    // Carrega métricas imediatamente
    this.loadHealthMetrics();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadHealthMetrics(): void {
    this.subscription.add(
      this.healthService.getDetailedHealth().subscribe(health => {
        this.healthData = health;
      })
    );
  }

  getPerformanceScore(): number {
    if (!this.healthData?.checks) return 0;
    
    let score = 100;
    const checks = this.healthData.checks;
    
    // Reduz pontuação baseado no uso de recursos
    if (checks.system.cpu_usage_percent) {
      if (checks.system.cpu_usage_percent > 80) score -= 30;
      else if (checks.system.cpu_usage_percent > 60) score -= 15;
    }
    
    if (checks.system.memory_usage_percent) {
      if (checks.system.memory_usage_percent > 80) score -= 30;
      else if (checks.system.memory_usage_percent > 60) score -= 15;
    }
    
    if (checks.system.disk_usage_percent) {
      if (checks.system.disk_usage_percent > 80) score -= 20;
      else if (checks.system.disk_usage_percent > 60) score -= 10;
    }
    
    // Reduz pontuação se banco está lento
    if (checks.database.response_time_ms && checks.database.response_time_ms > 100) {
      score -= 10;
    }
    
    // Reduz pontuação se há problemas nos serviços
    if (checks.database.status !== 'healthy') score -= 40;
    if (checks.cache.status !== 'healthy') score -= 20;
    
    return Math.max(0, score);
  }

  getPerformanceColor(): string {
    const score = this.getPerformanceScore();
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  }

  getPerformanceIcon(): string {
    const score = this.getPerformanceScore();
    if (score >= 80) return 'fas fa-tachometer-alt';
    if (score >= 60) return 'fas fa-exclamation-triangle';
    return 'fas fa-times-circle';
  }

  getResponseTimeColor(): string {
    if (!this.healthData?.checks.database.response_time_ms) return 'text-gray-500';
    const responseTime = this.healthData.checks.database.response_time_ms;
    
    if (responseTime <= 50) return 'text-emerald-500';
    if (responseTime <= 100) return 'text-yellow-500';
    return 'text-red-500';
  }

  getResponseTimeStatus(): string {
    if (!this.healthData?.checks.database.response_time_ms) return 'N/A';
    const responseTime = this.healthData.checks.database.response_time_ms;
    
    if (responseTime <= 50) return 'Excelente';
    if (responseTime <= 100) return 'Bom';
    if (responseTime <= 200) return 'Regular';
    return 'Lento';
  }
}
