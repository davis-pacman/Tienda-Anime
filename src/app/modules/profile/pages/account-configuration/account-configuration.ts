import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';

@Component({
  selector: 'app-account-configuration',
  imports: [CommonModule, RouterLink],
  templateUrl: './account-configuration.html',
  styleUrl: './account-configuration.css',
})
export class AccountConfiguration {
  private authService = inject(AuthService);
  private router = inject(Router);

  // 🎯 Enlazamos la Signal del servicio directamente a la vista
  public user = this.authService.currentUser;

  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
