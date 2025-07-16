// src/app/home/home.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HelloService } from '../hello.service';
import { AuthService } from '../auth/auth'; // Caminho para o seu auth.ts
import { Subscription } from 'rxjs';
import { MaterialModule } from '../material.module';

@Component({ // <-- GARANTA QUE ESTE DECORATOR ESTÁ PRESENTE E CORRETO
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MaterialModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'Meu Site Angular';
  helloMessage: string = 'Verificando status do Backend...';
  currentYear: number = new Date().getFullYear();
  isLoggedIn: boolean = false;
  private authSubscription: Subscription | undefined;

  constructor(private helloService: HelloService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        console.log('HomeComponent: Estado de login atualizado:', this.isLoggedIn);
        if (this.isLoggedIn) {
          console.log('HomeComponent: Usuário logado, chamando getBackendMessage()...');
          this.getBackendMessage();
        } else {
          this.helloMessage = 'Faça login para ver a mensagem protegida do Backend.';
          console.log('HomeComponent: Usuário deslogado, mensagem padrão exibida.');
        }
      }
    );
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  getBackendMessage(): void {
    console.log('HomeComponent: Executando getBackendMessage()...');
    this.helloService.getHelloMessage().subscribe(
      (message: string) => {
        this.helloMessage = message;
        console.log('HomeComponent: Mensagem do Backend recebida:', message);
      },
      (error) => {
        console.error('HomeComponent: Erro ao buscar mensagem do Backend:', error);
        if (error.status === 403 || error.status === 401) {
          this.helloMessage = 'Acesso negado. Faça login para ver a mensagem.';
        } else {
          this.helloMessage = 'Erro ao carregar mensagem do Backend.';
        }
      }
    );
  }
}
