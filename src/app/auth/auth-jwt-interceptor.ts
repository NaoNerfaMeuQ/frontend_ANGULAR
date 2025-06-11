import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS // Importe HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth'; // Importe o AuthService

@Injectable()
export class AuthJwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {} // Injeta AuthService

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken(); // Pega o token do AuthService

    // Se o token existe, clone a requisição e adicione o cabeçalho Authorization
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Adiciona o token no formato Bearer
        }
      });
    }
    // Prossegue com a requisição (modificada ou original)
    return next.handle(request);
  }
}

// Provedor para o interceptor (necessário para registrar no Angular)
export const authJwtInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthJwtInterceptor,
  multi: true // Define que múltiplos interceptors podem existir
};

export class authJwtInterceptor {
}
