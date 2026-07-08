
import { Component, inject, Input, OnInit, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product-service';
import { Product } from '../../../../core/model/product.interface';
import { CartService } from '../../../../core/services/cart-service';

@Component({
  selector: 'app-detail-product',
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.css',
})
export class DetailProduct implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);
  productos?: Product;
  producto = signal<Product | null>(null);


  ngOnInit(): void {
    this.obtenerProductoBySlug();
  }

  obtenerProductoBySlug(): void {
    this.productService.getProductoBySlug(this.slug).subscribe({
      next: (data) => {
        this.producto.set(data);
      },
      error: (err) => {
        console.error("ERROR AL OBTENER EL PRODUCTO:", err)
      }
    })
  }
  agregarAlCarrito(): void {
    if (this.productos) {
      this.cartService.addToCart(this.productos);
    }
  }

}
