import {Injectable, PLATFORM_ID, inject, Inject} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs'; // Importe BehaviorSubject
import { tap } from 'rxjs/operators'; // Importe tap para efeitos colaterais
import { LoginResponse } from './auth.model';
import {Router} from '@angular/router'; // Importe a interface LoginResponse

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  private isAuthenticatedSubject : BehaviorSubject<boolean>
  isAuthenticated$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
    ) {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  private hasToken(): boolean {
    // Só acesse localStorage se estiver no navegador
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('jwt_token');
      console.log('AuthService.hasToken(): Token no localStorage?', !!token);
      return !!token;
    }
    return false; // Se não estiver no navegador, não há token
  }

  register(userData: any): Observable<string> {
    return this.http.post(this.baseUrl + '/register', userData, { responseType: 'text' });
  }

  login(credentials: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl + '/login', credentials).pipe(
      tap(response => {
        if (response.token) {
          if(isPlatformBrowser(this.platformId)) {
            localStorage.setItem('jwt_token', response.token);
          }
          this.isAuthenticatedSubject.next(true);
          console.log('AuthService: Login bem-sucedido. Estado de autenticação: true. Token armazenado.');
        }
      })
    );
  }

  getToken(): string | null {
    // Só obtenha do localStorage se estiver no navegador
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('jwt_token');
    }
    return null;
  }

  logout(): void {
    // Só remova do localStorage se estiver no navegador
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwt_token');
    }
    this.isAuthenticatedSubject.next(false);
    console.log('AuthService: Logout realizado. Estado de autenticação: false.');
    this.router.navigate(['/login']);
  }
}
