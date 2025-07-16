import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth'; // Importe seu AuthService
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

// A função do guard (para Angular 15+)
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const authService = inject(AuthService); // Injeta AuthService
  const router = inject(Router);         // <--- INJEÇÃO DO ROUTER: VERIFIQUE AQUI E TAMBÉM A IMPORTAÇÃO

  return authService.isAuthenticated$.pipe(
    take(1), // Pega apenas o primeiro valor e completa o Observable
    map(isAuthenticated => {
      if (isAuthenticated) {
        console.log('AuthGuard: Usuário autenticado. Acesso permitido.');
        return true; // Permite o acesso à rota
      } else {
        console.log('AuthGuard: Usuário NÃO autenticado. Redirecionando para login...');
        router.navigate(['/login']); // <--- LINHA DO REDIRECIONAMENTO: VERIFIQUE SE ESTÁ EXATAMENTE ASSIM
        return false; // Bloqueia o acesso à rota
      }
    })
  );
};
