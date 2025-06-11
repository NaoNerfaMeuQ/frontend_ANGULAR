import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs'; // Importe BehaviorSubject
import { tap } from 'rxjs/operators'; // Importe tap para efeitos colaterais
import { LoginResponse } from './auth.model'; // Importe a interface LoginResponse

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  // BehaviorSubject para gerenciar o estado de autenticação (logado/deslogado)
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // Observable público

  constructor(private http: HttpClient) { }

  /**
   * Verifica se existe um token no localStorage (indicando que o usuário está logado).
   */
  private hasToken(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  /**
   * Envia uma requisição de registro para o backend.
   * @param userData Objeto contendo email e password.
   */
  register(userData: any): Observable<string> {
    return this.http.post(this.baseUrl + '/register', userData, { responseType: 'text' });
  }

  /**
   * Envia uma requisição de login para o backend e armazena o token.
   * @param credentials Objeto contendo email e password.
   */
  login(credentials: any): Observable<LoginResponse> { // Altere o tipo de retorno para LoginResponse
    return this.http.post<LoginResponse>(this.baseUrl + '/login', credentials).pipe( // Use <LoginResponse> aqui
      tap(response => {
        if (response.token) {
          localStorage.setItem('jwt_token', response.token); // Armazena o token no localStorage
          this.isAuthenticatedSubject.next(true); // Atualiza o estado de autenticação
          console.log('Token JWT armazenado:', response.token);
        }
      })
    );
  }

  /**
   * Retorna o token JWT do localStorage.
   */
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  /**
   * Remove o token JWT do localStorage e atualiza o estado de autenticação.
   */
  logout(): void {
    localStorage.removeItem('jwt_token');
    this.isAuthenticatedSubject.next(false);
    console.log('Usuário deslogado. Token JWT removido.');
    // Opcional: Redirecionar para a página de login ou inicial
  }
}
