import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart-service';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public user = this.authService.currentUser;

  get cartCount(): number {
    return this.cartService.totalItems;
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }

  buscar(termino: string) {
    if (termino.trim()) {
      this.router.navigate(['/store/catalog'], { queryParams: { q: termino.trim() } });
    }
  }
}
