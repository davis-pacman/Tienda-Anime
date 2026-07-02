import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  private readonly cartService = inject(CartService);

  get cartCount(): number {
    return this.cartService.totalItems;
  }
}
