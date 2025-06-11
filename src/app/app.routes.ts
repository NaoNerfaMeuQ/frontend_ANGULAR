import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login/login';

export const routes: Routes = [
  {
    path: '', //Rota para a raiz da aplicação (http://localhost:4200/)
    component: HomeComponent // Quando a rota for a raiz, exibe o HomeComponent
  },
  {
    path: 'login', //Rota para o login
    component: LoginComponent
  },
  // Rota para a página de contato (placeholder)
  // Adicione outras rotas aqui conforme seu projeto crescer

];
