import { Component, inject, OnInit, ChangeDetectorRef, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { ProductService } from '../../../../../core/services/product-service';
import { Product } from '../../../../../core/model/product.interface';
import { FilterService } from '../../../../../core/services/filter-service';

@Component({
  selector: 'app-products',
  imports: [RouterLink, DecimalPipe, NgOptimizedImage, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private productoservice = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);
  private filterService = inject(FilterService);

  listProductos: Product[] = [];

  private filterEffect = effect(() => {
    const catActual = this.filterService.categoryAtual();
    this.obtenerProductos(catActual);
  });

  ngOnInit(): void {
    this.obtenerProductos('');
  }

  obtenerProductos(catActual: string) {
    if (catActual == '') {
      this.productoservice.getProductos().subscribe({
        next: (data) => {
          this.listProductos = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al obtener productos:', err);
        }
      });
    } else {
      this.productoservice.getProductsByCategories(catActual).subscribe({
        next: (data) => {
          this.listProductos = data;
          this.cdr.detectChanges();
          console.log(this.listProductos);
        },
        error: (err) => {
          console.error("Error al obrener productos:", err);
        }
      })
    }
  }
}
