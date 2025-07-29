import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from 'rxjs';
import { HealthService, HealthSummary } from '../../../services/health.service';

@Component({
  selector: "app-card-health-status",
  templateUrl: "./card-health-status.component.html",
})
export class CardHealthStatusComponent implements OnInit, OnDestroy {
  @Input() title: string = "Status da Aplicação";
  
  healthSummary: HealthSummary | null = null;
  private subscription: Subscription = new Subscription();
  
  constructor(public healthService: HealthService) {}

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
    if (!this.healthSummary) return 'Carregando...';
    return this.healthService.getStatusText(this.healthSummary.overallStatus);
  }

  getOverallStatusColor(): string {
    if (!this.healthSummary) return 'text-gray-500';
    return this.healthService.getStatusColor(this.healthSummary.overallStatus);
  }

  getOverallStatusIcon(): string {
    if (!this.healthSummary) return 'fas fa-spinner fa-spin';
    return this.healthService.getStatusIcon(this.healthSummary.overallStatus);
  }

  getOverallStatusBgColor(): string {
    if (!this.healthSummary) return 'bg-gray-500';
    return this.healthService.getStatusBackgroundColor(this.healthSummary.overallStatus);
  }

  getLastUpdateText(): string {
    if (!this.healthSummary) return 'Nunca';
    const now = new Date();
    const diffMs = now.getTime() - this.healthSummary.lastUpdate.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    
    if (diffSeconds < 60) {
      return `${diffSeconds}s atrás`;
    } else if (diffSeconds < 3600) {
      return `${Math.floor(diffSeconds / 60)}m atrás`;
    } else {
      return `${Math.floor(diffSeconds / 3600)}h atrás`;
    }
  }

  refreshHealth(): void {
    // Força uma nova verificação
    window.location.reload();
  }
}
