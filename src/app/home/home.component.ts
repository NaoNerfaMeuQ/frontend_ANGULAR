// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Importe RouterLink para o botão Agendar

import { HelloService } from '../hello.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink], // Adicione RouterLink aqui
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  title = 'Meu Site Angular';
  helloMessage: string = '';
  currentYear: number = new Date().getFullYear(); // Adicione esta linha

  constructor(private helloService: HelloService) { }

  ngOnInit(): void {
    this.getBackendMessage();
  }

  getBackendMessage(): void {
    this.helloService.getHelloMessage().subscribe(
      (message: string) => {
        this.helloMessage = message;
        console.log('Mensagem do Backend:', message);
      },
      (error) => {
        console.error('Erro ao buscar mensagem do Backend:', error);
        this.helloMessage = 'Erro ao carregar mensagem.';
      }
    );
  }
}
