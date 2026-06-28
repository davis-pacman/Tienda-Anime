import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { ProductService } from '../../../../../core/services/product-service';
import { Product } from '../../../../../core/model/product.interface';

@Component({
  selector: 'app-products',
  imports: [RouterLink, DecimalPipe, NgOptimizedImage, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private productoservice = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

  listProductos: Product[] = [];

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoservice.getProductos().subscribe({
      next: (data) => {
        this.listProductos = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      },
    });
  }
}
