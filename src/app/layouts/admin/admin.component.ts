import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
})
export class AdminComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  
  async ngOnInit(): Promise<void> {
    // Verifica se o usuário está autenticado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return;
    }

    // Verifica se o token ainda é válido
    try {
      const isTokenValid = await this.authService.isTokenValid();
      if (!isTokenValid) {
        // Token expirado, redireciona para login
        this.authService.logout();
      }
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      this.authService.logout();
    }
  }
}
