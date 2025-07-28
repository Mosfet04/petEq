import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  resetForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showRegister = false;
  showPasswordReset = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // Formulário de login
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Formulário de cadastro
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });

    // Formulário de reset de senha
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Se já estiver autenticado, redireciona para o dashboard
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  // Login com email e senha
  async loginWithEmail(): Promise<void> {
    if (this.loginForm.valid) {
      try {
        this.isLoading = true;
        this.errorMessage = '';
        const { email, password } = this.loginForm.value;
        await this.authService.loginWithEmailAndPassword(email, password);
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
    }
  }

  // Cadastro com email e senha
  async registerWithEmail(): Promise<void> {
    if (this.registerForm.valid) {
      const { email, password, confirmPassword } = this.registerForm.value;
      
      if (password !== confirmPassword) {
        this.errorMessage = 'As senhas não coincidem.';
        return;
      }

      try {
        this.isLoading = true;
        this.errorMessage = '';
        await this.authService.registerWithEmailAndPassword(email, password);
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
    }
  }

  // Reset de senha
  async resetPassword(): Promise<void> {
    if (this.resetForm.valid) {
      try {
        this.isLoading = true;
        this.errorMessage = '';
        const { email } = this.resetForm.value;
        await this.authService.resetPassword(email);
        this.successMessage = 'Email de recuperação enviado! Verifique sua caixa de entrada.';
        this.showPasswordReset = false;
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    } else {
      this.errorMessage = 'Por favor, digite um email válido.';
    }
  }

  // Login com Google
  async loginWithGoogle(): Promise<void> {
    try {
      this.isLoading = true;
      this.errorMessage = '';
      await this.authService.loginWithGoogle();
    } catch (error: any) {
      this.errorMessage = error.message || 'Erro ao fazer login com Google. Tente novamente.';
    } finally {
      this.isLoading = false;
    }
  }

  // Alternar entre login e cadastro
  toggleRegister(): void {
    this.showRegister = !this.showRegister;
    this.showPasswordReset = false;
    this.errorMessage = '';
    this.successMessage = '';
    this.resetForms();
  }

  // Alternar reset de senha
  togglePasswordReset(): void {
    this.showPasswordReset = !this.showPasswordReset;
    this.showRegister = false;
    this.errorMessage = '';
    this.successMessage = '';
    this.resetForms();
  }

  // Limpar formulários
  private resetForms(): void {
    this.loginForm.reset();
    this.registerForm.reset();
    this.resetForm.reset();
  }
}
