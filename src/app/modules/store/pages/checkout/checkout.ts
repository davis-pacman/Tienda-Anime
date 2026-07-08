import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../../core/services/cart-service';
import { StoreDataService } from '../../../../core/services/store-data-service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly storeDataService = inject(StoreDataService);
  private readonly router = inject(Router);

  checkoutForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    direccion: ['', Validators.required],
    metodoPago: ['Yape/Plin', Validators.required],
    observacion: [''],
  });

  readonly items = this.cartService.items;

  get totalPrice(): number {
    return this.cartService.totalPrice;
  }

  submitOrder(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const formValue = this.checkoutForm.value;

    this.storeDataService.createOrder({
      clienteNombre: formValue.nombre,
      correo: formValue.correo,
      telefono: formValue.telefono,
      direccion: formValue.direccion,
      metodoPago: formValue.metodoPago,
      observacion: formValue.observacion,
      items: this.items().map((item) => ({
        productoId: item.productoId,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
        imagenUrl: item.imagenUrl,
      })),
      subtotal: this.totalPrice,
      total: this.totalPrice,
    }).subscribe({
      next: (order) => {
        this.cartService.clearCart();
        this.router.navigate(['/store/checkout/success', order.id]);
      },
      error: (err) => {
        console.error('Error al crear orden', err);
      },
    });
  }
}
