import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, interval } from 'rxjs';
import { HealthService, DetailedHealthStatus } from '../../../services/health.service';

export interface HealthAlert {
  id: string;
  level: 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  component: string;
  acknowledged?: boolean;
}

@Component({
  selector: "app-card-health-alerts",
  templateUrl: "./card-health-alerts.component.html",
})
export class CardHealthAlertsComponent implements OnInit, OnDestroy {
  alerts: HealthAlert[] = [];
  private subscription: Subscription = new Subscription();
  
  constructor(public healthService: HealthService) {}

  ngOnInit(): void {
    // Verifica alertas a cada 30 segundos
    this.subscription.add(
      interval(30000).subscribe(() => {
        this.checkHealthAlerts();
      })
    );
    
    // Verifica alertas imediatamente
    this.checkHealthAlerts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private checkHealthAlerts(): void {
    this.subscription.add(
      this.healthService.getDetailedHealth().subscribe(health => {
        this.generateAlerts(health);
      })
    );
  }

  private generateAlerts(health: DetailedHealthStatus): void {
    const newAlerts: HealthAlert[] = [];
    const now = new Date();

    // Verifica status geral
    if (health.status === 'unhealthy') {
      newAlerts.push({
        id: 'general-unhealthy',
        level: 'error',
        title: 'Aplicação com Problemas',
        message: 'A aplicação está reportando status não saudável. Verificação necessária.',
        timestamp: now,
        component: 'Sistema Geral'
      });
    }

    // Verifica banco de dados
    if (health.checks.database.status === 'unhealthy') {
      newAlerts.push({
        id: 'database-unhealthy',
        level: 'error',
        title: 'Banco de Dados Indisponível',
        message: 'O banco de dados não está respondendo corretamente.',
        timestamp: now,
        component: 'Banco de Dados'
      });
    } else if (health.checks.database.response_time_ms && health.checks.database.response_time_ms > 200) {
      newAlerts.push({
        id: 'database-slow',
        level: 'warning',
        title: 'Banco de Dados Lento',
        message: `Tempo de resposta elevado: ${health.checks.database.response_time_ms}ms`,
        timestamp: now,
        component: 'Banco de Dados'
      });
    }

    // Verifica cache
    if (health.checks.cache.status === 'unhealthy') {
      newAlerts.push({
        id: 'cache-unhealthy',
        level: 'warning',
        title: 'Cache Indisponível',
        message: 'O serviço de cache não está funcionando corretamente.',
        timestamp: now,
        component: 'Cache'
      });
    }

    // Verifica recursos do sistema
    if (health.checks.system.cpu_usage_percent && health.checks.system.cpu_usage_percent > 90) {
      newAlerts.push({
        id: 'cpu-critical',
        level: 'error',
        title: 'CPU Sobrecarregada',
        message: `Uso de CPU crítico: ${health.checks.system.cpu_usage_percent.toFixed(1)}%`,
        timestamp: now,
        component: 'Sistema'
      });
    } else if (health.checks.system.cpu_usage_percent && health.checks.system.cpu_usage_percent > 80) {
      newAlerts.push({
        id: 'cpu-warning',
        level: 'warning',
        title: 'CPU Elevada',
        message: `Uso de CPU alto: ${health.checks.system.cpu_usage_percent.toFixed(1)}%`,
        timestamp: now,
        component: 'Sistema'
      });
    }

    if (health.checks.system.memory_usage_percent && health.checks.system.memory_usage_percent > 90) {
      newAlerts.push({
        id: 'memory-critical',
        level: 'error',
        title: 'Memória Crítica',
        message: `Uso de memória crítico: ${health.checks.system.memory_usage_percent.toFixed(1)}%`,
        timestamp: now,
        component: 'Sistema'
      });
    } else if (health.checks.system.memory_usage_percent && health.checks.system.memory_usage_percent > 80) {
      newAlerts.push({
        id: 'memory-warning',
        level: 'warning',
        title: 'Memória Elevada',
        message: `Uso de memória alto: ${health.checks.system.memory_usage_percent.toFixed(1)}%`,
        timestamp: now,
        component: 'Sistema'
      });
    }

    if (health.checks.system.disk_usage_percent && health.checks.system.disk_usage_percent > 90) {
      newAlerts.push({
        id: 'disk-critical',
        level: 'error',
        title: 'Disco Quase Cheio',
        message: `Uso de disco crítico: ${health.checks.system.disk_usage_percent.toFixed(1)}%`,
        timestamp: now,
        component: 'Sistema'
      });
    } else if (health.checks.system.disk_usage_percent && health.checks.system.disk_usage_percent > 80) {
      newAlerts.push({
        id: 'disk-warning',
        level: 'warning',
        title: 'Espaço em Disco Baixo',
        message: `Uso de disco alto: ${health.checks.system.disk_usage_percent.toFixed(1)}%`,
        timestamp: now,
        component: 'Sistema'
      });
    }

    // Mantém apenas alertas não reconhecidos anteriores e adiciona novos
    const existingUnacknowledged = this.alerts.filter(alert => !alert.acknowledged);
    const newAlertIds = newAlerts.map(alert => alert.id);
    const filteredExisting = existingUnacknowledged.filter(alert => newAlertIds.includes(alert.id));
    
    // Adiciona apenas alertas realmente novos
    const existingIds = filteredExisting.map(alert => alert.id);
    const reallyNewAlerts = newAlerts.filter(alert => !existingIds.includes(alert.id));
    
    this.alerts = [...filteredExisting, ...reallyNewAlerts];
    
    // Ordena por timestamp (mais recentes primeiro)
    this.alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    // Mantém apenas os últimos 10 alertas
    this.alerts = this.alerts.slice(0, 10);
  }

  acknowledgeAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
    }
  }

  getAlertIcon(level: string): string {
    switch (level) {
      case 'error': return 'fas fa-exclamation-circle';
      case 'warning': return 'fas fa-exclamation-triangle';
      case 'info': return 'fas fa-info-circle';
      default: return 'fas fa-bell';
    }
  }

  getAlertColor(level: string): string {
    switch (level) {
      case 'error': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'info': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  }

  getAlertBgColor(level: string): string {
    switch (level) {
      case 'error': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  }

  getActiveAlertsCount(): number {
    return this.alerts.filter(alert => !alert.acknowledged).length;
  }

  getCriticalAlertsCount(): number {
    return this.alerts.filter(alert => !alert.acknowledged && alert.level === 'error').length;
  }

  getTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 1) return 'Agora';
    if (diffMinutes < 60) return `${diffMinutes}m atrás`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h atrás`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d atrás`;
  }

  getAlertWrapperClasses(alert: HealthAlert): any {
    const classes: any = {};
    
    if (alert.acknowledged) {
      classes['opacity-50'] = true;
      classes['bg-gray-50'] = true;
      classes['border-gray-200'] = true;
    } else {
      const bgClass = this.getAlertBgColor(alert.level);
      const classNames = bgClass.split(' ');
      classNames.forEach(className => {
        classes[className] = true;
      });
    }
    
    return classes;
  }

  getCriticalCount(): number {
    return this.alerts.filter(a => !a.acknowledged && a.level === 'error').length;
  }

  getWarningCount(): number {
    return this.alerts.filter(a => !a.acknowledged && a.level === 'warning').length;
  }

  getInfoCount(): number {
    return this.alerts.filter(a => !a.acknowledged && a.level === 'info').length;
  }

  getBadgeClasses(alert: HealthAlert): any {
    if (alert.acknowledged) {
      return { 'bg-gray-100': true, 'text-gray-600': true };
    }
    
    switch (alert.level) {
      case 'error':
        return { 'bg-red-100': true, 'text-red-700': true };
      case 'warning':
        return { 'bg-yellow-100': true, 'text-yellow-700': true };
      case 'info':
        return { 'bg-blue-100': true, 'text-blue-700': true };
      default:
        return { 'bg-gray-100': true, 'text-gray-600': true };
    }
  }
}
