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
    console.log('AuthInterceptor: Interceptando requisição para:', request.url); // NOVO LOG
    const token = this.authService.getToken(); // Pega o token do AuthService

    console.log('AuthInterceptor: Token obtido:', token ? 'Token presente' : 'Nenhum token'); // DEBUG

    // Se o token existe, clone a requisição e adicione o cabeçalho Authorization
    if (token && token.length > 0) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Adiciona o token no formato Bearer
        }
      });
      console.log('AuthInterceptor: Cabeçalho Authorization adicionado.'); // DEBUG
    } else {
      console.log('AuthInterceptor: Nenhum token para adicionar.'); // DEBUG
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
