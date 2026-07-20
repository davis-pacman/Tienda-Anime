
import { Component, inject, Input, OnInit, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product-service';
import { Product } from '../../../../core/model/product.interface';

@Component({
  selector: 'app-detail-product',
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-product.html',
})
export class DetailProduct implements OnInit {
  private readonly productService = inject(ProductService);

  producto = signal<Product | null>(null);

  productos?: Product;

  @Input() slug!: string;

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
    });
  }


}
