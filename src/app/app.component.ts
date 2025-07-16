import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router'; // Importe RouterOutlet
import { MaterialModule } from './material.module';

@Component({
  selector: 'app-root', // Este é o seletor que o main.ts procura
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MaterialModule,
    RouterLinkActive,
    RouterLink
  ], // Importe RouterOutlet aqui
  templateUrl: './app.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }
