import { Component, OnInit } from '@angular/core'; // Remova OnDestroy
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// Remova import HelloService, AuthService, Subscription

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // Remova MaterialModule se não for usar aqui
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit { // Remova implements OnDestroy
  title = 'Espaço Psicológico'; // Novo título mais simples
  // Remova helloMessage, isLoggedIn, authSubscription, currentYear

  constructor() { } // Remova a injeção de HelloService e AuthService

  ngOnInit(): void {
    // Remova toda a lógica de subscribe e chamadas ao backend/logout
  }

  // Remova onLogout() e getBackendMessage(), e ngOnDestroy()
}
