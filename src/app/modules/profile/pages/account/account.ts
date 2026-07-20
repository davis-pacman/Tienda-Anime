import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [CommonModule],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {
  private authService = inject(AuthService);
  private router = inject(Router);

  // 🎯 Enlazamos la Signal del servicio directamente a la vista
  public user = this.authService.currentUser;

  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
