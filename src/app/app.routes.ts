import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './auth/login/login';
import { authGuard } from './auth/auth-guard';
import { AboutComponent } from './pages/about/about';
import { ServicesComponent } from './pages/services/services';
import { ContactComponent } from './pages/contact/contact';
export const routes: Routes = [
  {
    path: '', //Rota para a raiz da aplicação (http://localhost:4200/)
    component: HomeComponent, // Quando a rota for a raiz, exibe o HomeComponent
    //canActivate: [authGuard] // <-- PROTEGE A ROTA COM O GUARD (RETIRAR DEPOIS)
  },
  {
    path: 'login', //Rota para o login
    component: LoginComponent
  },
  {
    path: 'sobre-mim',
    component: AboutComponent
    // Se quiser, pode proteger esta rota também com canActivate: [authGuard]
  },
  {
    path: 'servicos',
    component: ServicesComponent
    // Se quiser, pode proteger esta rota também
  },
  {
    path: 'contato',
    component: ContactComponent
    // Esta provavelmente deveria ser pública
  },
  // Rota para redirecionar para a home caso a URL não seja encontrada
  { path: '**', redirectTo: '' }
];
