import { Injectable, signal } from '@angular/core';
import { CartItem } from '../model/cart-item.interface';
import { Product } from '../model/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly storageKey = 'akihabara-cart';
  items = signal<CartItem[]>(this.loadCart());

  addToCart(producto: Product): void {
    const current = this.items();
    const existing = current.find((item) => item.productoId === producto.id);

    if (existing) {
      this.items.set(
        current.map((item) =>
          item.productoId === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        ),
      );
    } else {
      this.items.set([
        ...current,
        {
          id: Date.now(),
          productoId: producto.id,
          nombre: producto.nombre,
          precio: producto.precioActual,
          imagenUrl: producto.imagenUrl,
          cantidad: 1,
          categoria: producto.categoria,
        },
      ]);
    }

    this.persist();
  }

  updateQuantity(productoId: number, cantidad: number): void {
    this.items.set(
      this.items()
        .map((item) => (item.productoId === productoId ? { ...item, cantidad } : item))
        .filter((item) => item.cantidad > 0),
    );
    this.persist();
  }

  removeFromCart(productoId: number): void {
    this.items.set(this.items().filter((item) => item.productoId !== productoId));
    this.persist();
  }

  clearCart(): void {
    this.items.set([]);
    this.persist();
  }

  get totalItems(): number {
    return this.items().reduce((sum, item) => sum + item.cantidad, 0);
  }

  get totalPrice(): number {
    return this.items().reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }

  private persist(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items()));
  }

  private loadCart(): CartItem[] {
    if (typeof globalThis.window === 'undefined') {
      return [];
    }

    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }
}
