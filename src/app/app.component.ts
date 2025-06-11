import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // Importe RouterOutlet

@Component({
  selector: 'app-root', // Este é o seletor que o main.ts procura
  standalone: true,
  imports: [CommonModule, RouterOutlet], // Importe RouterOutlet aqui
  template: '<router-outlet></router-outlet>', // Onde as rotas serão exibidas
  styleUrl: './app.component.css'
})
export class AppComponent { }
