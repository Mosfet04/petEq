import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, interval, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import axios, { AxiosResponse } from 'axios';

export interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded' | 'ready' | 'not_ready' | 'alive' | 'dead' | 'unknown';
  timestamp: string;
  service: string;
  version: string;
  error?: string;
}

export interface DetailedHealthStatus extends HealthStatus {
  checks: {
    database: {
      status: string;
      response_time_ms?: number;
      details: string;
      error?: string;
    };
    cache: {
      status: string;
      details: string;
      error?: string;
    };
    system: {
      status: string;
      cpu_usage_percent?: number;
      memory_usage_percent?: number;
      disk_usage_percent?: number;
      warnings?: string | null;
    };
  };
}

export interface HealthSummary {
  overallStatus: 'healthy' | 'warning' | 'critical' | 'unknown';
  lastUpdate: Date;
  uptime: string;
  systemHealth: {
    database: { status: string; responseTime: number };
    cache: { status: string };
    cpu: { usage: number; status: string };
    memory: { usage: number; status: string };
    disk: { usage: number; status: string };
  };
}

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private readonly API_BASE_URL = environment.urlBackEnd || 'http://localhost:5000';
  private healthStatusSubject = new BehaviorSubject<HealthSummary | null>(null);
  public healthStatus$ = this.healthStatusSubject.asObservable();

  constructor() {
    // Atualiza o status de health a cada 30 segundos
    interval(30000).subscribe(() => {
      this.refreshHealthStatus();
    });
    
    // Primeira verificação imediata
    this.refreshHealthStatus();
  }

  getBasicHealth(): Observable<HealthStatus> {
    return from(axios.get<HealthStatus>(`${this.API_BASE_URL}/health`))
      .pipe(
        map((response: AxiosResponse<HealthStatus>) => response.data),
        catchError(error => {
          console.error('Erro ao buscar health básico:', error);
          return from([{
            status: 'unknown' as const,
            timestamp: new Date().toISOString(),
            service: 'PythonPet API',
            version: 'unknown',
            error: 'Falha na comunicação com a API'
          }]);
        })
      );
  }

  getDetailedHealth(): Observable<DetailedHealthStatus> {
    return from(axios.get<DetailedHealthStatus>(`${this.API_BASE_URL}/health/detailed`))
      .pipe(
        map((response: AxiosResponse<DetailedHealthStatus>) => response.data),
        catchError(error => {
          console.error('Erro ao buscar health detalhado:', error);
          return from([{
            status: 'unknown' as const,
            timestamp: new Date().toISOString(),
            service: 'PythonPet API',
            version: 'unknown',
            error: 'Falha na comunicação com a API',
            checks: {
              database: { status: 'unknown', details: 'Não foi possível verificar' },
              cache: { status: 'unknown', details: 'Não foi possível verificar' },
              system: { status: 'unknown' }
            }
          }]);
        })
      );
  }

  getReadinessCheck(): Observable<HealthStatus> {
    return from(axios.get<HealthStatus>(`${this.API_BASE_URL}/health/ready`))
      .pipe(
        map((response: AxiosResponse<HealthStatus>) => response.data),
        catchError(error => {
          console.error('Erro ao buscar readiness check:', error);
          return from([{
            status: 'not_ready' as const,
            timestamp: new Date().toISOString(),
            service: 'PythonPet API',
            version: 'unknown',
            error: 'Aplicação não está pronta'
          }]);
        })
      );
  }

  getLivenessCheck(): Observable<HealthStatus> {
    return from(axios.get<HealthStatus>(`${this.API_BASE_URL}/health/live`))
      .pipe(
        map((response: AxiosResponse<HealthStatus>) => response.data),
        catchError(error => {
          console.error('Erro ao buscar liveness check:', error);
          return from([{
            status: 'dead' as const,
            timestamp: new Date().toISOString(),
            service: 'PythonPet API',
            version: 'unknown',
            error: 'Aplicação não está respondendo'
          }]);
        })
      );
  }

  private refreshHealthStatus(): void {
    this.getDetailedHealth().subscribe(detailed => {
      const summary: HealthSummary = this.createHealthSummary(detailed);
      this.healthStatusSubject.next(summary);
    });
  }

  private createHealthSummary(detailed: DetailedHealthStatus): HealthSummary {
    const now = new Date();
    
    // Determina o status geral baseado nos componentes
    let overallStatus: 'healthy' | 'warning' | 'critical' | 'unknown' = 'healthy';
    
    if (detailed.status === 'unhealthy' || 
        detailed.checks.database.status === 'unhealthy' ||
        detailed.checks.cache.status === 'unhealthy') {
      overallStatus = 'critical';
    } else if (detailed.status === 'degraded' ||
               detailed.checks.system.cpu_usage_percent && detailed.checks.system.cpu_usage_percent > 80 ||
               detailed.checks.system.memory_usage_percent && detailed.checks.system.memory_usage_percent > 80 ||
               detailed.checks.system.disk_usage_percent && detailed.checks.system.disk_usage_percent > 80) {
      overallStatus = 'warning';
    } else if (detailed.status === 'unknown') {
      overallStatus = 'unknown';
    }

    return {
      overallStatus,
      lastUpdate: now,
      uptime: this.calculateUptime(detailed.timestamp),
      systemHealth: {
        database: {
          status: detailed.checks.database.status,
          responseTime: detailed.checks.database.response_time_ms || 0
        },
        cache: {
          status: detailed.checks.cache.status
        },
        cpu: {
          usage: detailed.checks.system.cpu_usage_percent || 0,
          status: this.getResourceStatus(detailed.checks.system.cpu_usage_percent || 0)
        },
        memory: {
          usage: detailed.checks.system.memory_usage_percent || 0,
          status: this.getResourceStatus(detailed.checks.system.memory_usage_percent || 0)
        },
        disk: {
          usage: detailed.checks.system.disk_usage_percent || 0,
          status: this.getResourceStatus(detailed.checks.system.disk_usage_percent || 0)
        }
      }
    };
  }

  private getResourceStatus(usage: number): string {
    if (usage >= 95) return 'critical';
    if (usage >= 80) return 'warning';
    return 'healthy';
  }

  private calculateUptime(timestamp: string): string {
    const now = new Date();
    const startTime = new Date(timestamp);
    const uptimeMs = now.getTime() - startTime.getTime();
    
    const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((uptimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  }

  // Métodos utilitários para obter informações formatadas
  getStatusColor(status: string): string {
    switch (status) {
      case 'healthy':
      case 'ready':
      case 'alive':
        return 'text-emerald-500';
      case 'warning':
      case 'degraded':
        return 'text-yellow-500';
      case 'critical':
      case 'unhealthy':
      case 'not_ready':
      case 'dead':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'healthy':
      case 'ready':
      case 'alive':
        return 'fas fa-check-circle';
      case 'warning':
      case 'degraded':
        return 'fas fa-exclamation-triangle';
      case 'critical':
      case 'unhealthy':
      case 'not_ready':
      case 'dead':
        return 'fas fa-times-circle';
      default:
        return 'fas fa-question-circle';
    }
  }

  getStatusBackgroundColor(status: string): string {
    switch (status) {
      case 'healthy':
      case 'ready':
      case 'alive':
        return 'bg-emerald-500';
      case 'warning':
      case 'degraded':
        return 'bg-yellow-500';
      case 'critical':
      case 'unhealthy':
      case 'not_ready':
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'healthy': return 'Saudável';
      case 'unhealthy': return 'Com problemas';
      case 'degraded': return 'Degradado';
      case 'ready': return 'Pronto';
      case 'not_ready': return 'Não pronto';
      case 'alive': return 'Ativo';
      case 'dead': return 'Inativo';
      case 'warning': return 'Atenção';
      case 'critical': return 'Crítico';
      default: return 'Desconhecido';
    }
  }
}
