// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { authJwtInterceptorProvider } from './auth/auth-jwt-interceptor'; // Importe o provedor do interceptor

export const appConfig: ApplicationConfig = {
    providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()), // Mantenha comFetch() se for seu caso
    authJwtInterceptorProvider // Adicione o provedor do seu interceptor aqui
  ]
};
