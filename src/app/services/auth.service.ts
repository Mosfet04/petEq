import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { 
  Auth, 
  signInWithPopup, 
  signInWithRedirect, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider, 
  User,
  onAuthStateChanged,
  signOut,
  getRedirectResult
} from 'firebase/auth';
import { auth } from '../firebase-config';
import { BehaviorSubject, Observable } from 'rxjs';
import { isEmailAuthorized } from '../config/authorized-emails';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  
  constructor(private router: Router) {
    // Monitora mudanças no estado de autenticação
    onAuthStateChanged(auth, (user) => {
      this.userSubject.next(user);
      if (user) {
        // Verifica se o usuário está autorizado
        if (isEmailAuthorized(user.email || '')) {
          // Usuário autorizado, salva o token
          user.getIdToken().then(token => {
            localStorage.setItem('accessToken', token);
          });
        } else {
          // Usuário não autorizado, faz logout
          this.logout();
          alert('Acesso negado. Seu email não está autorizado para acessar o sistema.');
        }
      } else {
        // Usuário não está logado
        localStorage.removeItem('accessToken');
      }
    });

    // Verifica se há um resultado de redirecionamento pendente
    getRedirectResult(auth).then((result) => {
      if (result && isEmailAuthorized(result.user.email || '')) {
        this.router.navigate(['/admin/dashboard']);
      }
    }).catch((error) => {
      console.error('Erro no redirecionamento:', error);
    });
  }

  // Login com email e senha
  async loginWithEmailAndPassword(email: string, password: string): Promise<void> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user && isEmailAuthorized(result.user.email || '')) {
        this.router.navigate(['/admin/dashboard']);
      }
    } catch (error) {
      console.error('Erro no login com email/senha:', error);
      throw this.handleAuthError(error);
    }
  }

  // Cadastro com email e senha (para criar novos usuários)
  async registerWithEmailAndPassword(email: string, password: string): Promise<void> {
    try {
      // Verifica se o email está autorizado ANTES de criar a conta
      if (!isEmailAuthorized(email)) {
        throw new Error('Email não autorizado para acessar o sistema');
      }
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (result.user) {
        this.router.navigate(['/admin/dashboard']);
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      throw this.handleAuthError(error);
    }
  }

  // Recuperação de senha
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Erro ao enviar email de recuperação:', error);
      throw this.handleAuthError(error);
    }
  }

  // Login com Google
  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      
      const result = await signInWithPopup(auth, provider);
      if (result.user && isEmailAuthorized(result.user.email || '')) {
        this.router.navigate(['/admin/dashboard']);
      }
    } catch (error) {
      console.error('Erro no login com Google:', error);
      throw this.handleAuthError(error);
    }
  }

  // Login com redirecionamento (para dispositivos móveis)
  async loginWithGoogleRedirect(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Erro no redirecionamento Google:', error);
      throw this.handleAuthError(error);
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(auth);
      localStorage.clear();
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    }
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.userSubject.value && !!localStorage.getItem('accessToken');
  }

  // Obtém o usuário atual
  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  // Obtém o token atual
  async getCurrentToken(): Promise<string | null> {
    const user = this.getCurrentUser();
    if (user) {
      try {
        return await user.getIdToken();
      } catch (error) {
        console.error('Erro ao obter token:', error);
        return null;
      }
    }
    return null;
  }

  // Verifica se o token é válido
  async isTokenValid(): Promise<boolean> {
    try {
      const token = await this.getCurrentToken();
      return !!token;
    } catch (error) {
      return false;
    }
  }

  // Tratamento de erros do Firebase Auth
  private handleAuthError(error: any): Error {
    let message = 'Erro na autenticação';
    
    switch (error.code) {
      case 'auth/user-not-found':
        message = 'Usuário não encontrado';
        break;
      case 'auth/wrong-password':
        message = 'Senha incorreta';
        break;
      case 'auth/invalid-email':
        message = 'Email inválido';
        break;
      case 'auth/user-disabled':
        message = 'Usuário desabilitado';
        break;
      case 'auth/email-already-in-use':
        message = 'Email já está em uso';
        break;
      case 'auth/weak-password':
        message = 'Senha muito fraca (mínimo 6 caracteres)';
        break;
      case 'auth/operation-not-allowed':
        message = 'Operação não permitida. Contate o administrador';
        break;
      case 'auth/too-many-requests':
        message = 'Muitas tentativas. Tente novamente mais tarde';
        break;
      default:
        message = error.message || 'Erro desconhecido';
    }
    
    return new Error(message);
  }
}
