import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart-service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  readonly items = this.cartService.items;

  increaseQuantity(productoId: string | undefined): void {
    this.cartService.updateQuantity(productoId, this.getItem(productoId).cantidad + 1);
  }

  decreaseQuantity(productoId: string | undefined): void {
    const item = this.getItem(productoId);
    this.cartService.updateQuantity(productoId, item.cantidad - 1);
  }

  removeItem(productoId?: string): void {
    this.cartService.removeFromCart(productoId);
  }

  goToCheckout(): void {
    if (this.cartService.items().length === 0) {
      return;
    }

    this.router.navigate(['/store/checkout']);
  }

  get totalItems(): number {
    return this.cartService.totalItems;
  }

  get totalPrice(): number {
    return this.cartService.totalPrice;
  }

  private getItem(productoId: string | undefined) {
    return this.cartService.items().find((item) => item.productoId === productoId)!;
  }
}
