import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../../core/services/product-service';
import { Product } from '../../../../core/model/product.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  imports: [RouterLink],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.css',
})
export class DetailProduct implements OnInit {
  private productService = inject(ProductService);

  producto = signal<Product | null>(null);

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
    })
  }
}
