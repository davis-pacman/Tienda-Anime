import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-layout-admin',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout-admin.html',
  styleUrl: '../../../../styles.css',
})
export class LayoutAdmin {
  private authService = inject(AuthService);
  private router = inject(Router);

  public user = this.authService.currentUser;

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
