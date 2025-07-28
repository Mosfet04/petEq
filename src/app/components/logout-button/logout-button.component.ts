import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout-button',
  template: `
    <button
      class="text-slate-700 hover:text-slate-500 text-xs uppercase py-3 font-bold block"
      (click)="logout()"
    >
      <i class="fas fa-sign-out-alt opacity-75 mr-2 text-sm"></i>
      Logout
    </button>
  `
})
export class LogoutButtonComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
