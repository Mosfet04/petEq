import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Exibe uma notificação de sucesso
   * @param message Mensagem a ser exibida
   * @param duration Duração em milissegundos (padrão: 3000)
   */
  showSuccess(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Fechar', {
      duration,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  /**
   * Exibe uma notificação de erro
   * @param message Mensagem a ser exibida
   * @param duration Duração em milissegundos (padrão: 5000)
   */
  showError(message: string, duration: number = 5000): void {
    this.snackBar.open(message, 'Fechar', {
      duration,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  /**
   * Exibe uma notificação de aviso
   * @param message Mensagem a ser exibida
   * @param duration Duração em milissegundos (padrão: 4000)
   */
  showWarning(message: string, duration: number = 4000): void {
    this.snackBar.open(message, 'Fechar', {
      duration,
      panelClass: ['warning-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  /**
   * Exibe uma notificação de informação
   * @param message Mensagem a ser exibida
   * @param duration Duração em milissegundos (padrão: 3000)
   */
  showInfo(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Fechar', {
      duration,
      panelClass: ['info-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  /**
   * Processa e exibe erro de requisições axios
   * @param error Erro retornado do axios
   */
  handleAxiosError(error: any): void {
    let errorMessage = 'Ocorreu um erro inesperado';
    
    if (error.response) {
      // O servidor retornou um status de erro
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 400:
          errorMessage = data?.message || 'Dados inválidos enviados para o servidor';
          break;
        case 401:
          errorMessage = 'Acesso não autorizado. Verifique suas credenciais';
          break;
        case 403:
          errorMessage = 'Acesso negado. Você não tem permissão para esta operação';
          break;
        case 404:
          errorMessage = 'Recurso não encontrado';
          break;
        case 409:
          errorMessage = data?.message || 'Conflito de dados. O recurso já existe ou está sendo usado';
          break;
        case 422:
          errorMessage = data?.message || 'Dados enviados são inválidos';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor. Tente novamente mais tarde';
          break;
        case 502:
          errorMessage = 'Serviço temporariamente indisponível';
          break;
        case 503:
          errorMessage = 'Serviço em manutenção. Tente novamente mais tarde';
          break;
        default:
          errorMessage = data?.message || `Erro do servidor (${status})`;
      }
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      errorMessage = 'Sem resposta do servidor. Verifique sua conexão com a internet';
    } else {
      // Algo deu errado ao configurar a requisição
      errorMessage = error.message || 'Erro ao configurar a requisição';
    }
    
    this.showError(errorMessage);
  }
}
