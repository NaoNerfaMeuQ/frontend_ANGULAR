import { Component, OnInit, OnDestroy } from '@angular/core'; // Importe OnInit, OnDestroy
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MaterialModule } from './material.module';
import { AuthService } from './auth/auth'; // Importe AuthService
import { Subscription } from 'rxjs'; // Importe Subscription

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MaterialModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy { // Implemente OnInit, OnDestroy
  title = 'site_psicotea'; // Título para o navegador
  isLoggedIn: boolean = false;
  private authSubscription: Subscription | undefined;

  constructor(private authService: AuthService) { } // Injete AuthService

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        console.log('AppComponent: Estado de login:', this.isLoggedIn);
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
}
