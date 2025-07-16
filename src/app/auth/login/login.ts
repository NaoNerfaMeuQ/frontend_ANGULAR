// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth';
import { LoginResponse } from '../auth.model'; // Importe LoginResponse para tipagem
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, preencha o email e a senha para registrar.';
      return;
    }

    const userData = { email: this.username, password: this.password };

    this.authService.register(userData).subscribe(
      (response: string) => { // 'response' ainda é string para registro
        this.successMessage = response;
        this.errorMessage = '';
        console.log('Registro bem-sucedido:', response);
      },
      (error) => {
        this.errorMessage = error.error || 'Erro ao registrar usuário.';
        this.successMessage = '';
        console.error('Erro no registro:', error);
      }
    );
  }

  onLogin(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, preencha o email e a senha para fazer login.';
      return;
    }

    const credentials = { email: this.username, password: this.password };

    this.authService.login(credentials).subscribe(
      (response: LoginResponse) => { // <--- AGORA ESPERA 'LoginResponse'
        this.successMessage = response.message; // Acessa a mensagem do objeto
        this.errorMessage = '';
        console.log('Login bem-sucedido. Token:', response.token);
        this.router.navigate(['/']); // Redireciona para a página inicial
      },
      (error) => {
        this.errorMessage = error.error || 'Email ou senha erradas.';
        this.successMessage = '';
        console.error('Erro no login:', error);
      }
    );
  }
}
