import { Component, inject, OnInit, ChangeDetectorRef, effect } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule, NgOptimizedImage, DecimalPipe } from '@angular/common';
import { ProductService } from '../../../../../core/services/product-service';
import { Product } from '../../../../../core/model/product.interface';
import { FilterService } from '../../../../../core/services/filter-service';
import { CartService } from '../../../../../core/services/cart-service';

@Component({
  selector: 'app-products',
  imports: [RouterLink, DecimalPipe, NgOptimizedImage, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private readonly productoservice = inject(ProductService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly filterService = inject(FilterService);
  private readonly cartService = inject(CartService);
  private readonly route = inject(ActivatedRoute);

  listProductos: Product[] = [];
  searchTerm: string = '';

  private filterEffect = effect(() => {
    const catActual = this.filterService.categoryAtual();
    this.obtenerProductos(catActual, this.searchTerm);
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'] || '';
      const catUrl = params['cat'];
      
      if (catUrl) {
        this.filterService.updateCategory(catUrl);
      } else {
        // Trigger fetch directly if no category effect triggers
        this.obtenerProductos(this.filterService.categoryAtual(), this.searchTerm);
      }
    });
  }

  obtenerProductos(catActual: string, query: string) {
    let obs = catActual === '' 
      ? this.productoservice.getProductos() 
      : this.productoservice.getProductsByCategories(catActual);

    obs.subscribe({
      next: (data) => {
        if (query) {
          const lowerQuery = query.toLowerCase();
          this.listProductos = data.filter(p => p.nombre.toLowerCase().includes(lowerQuery) || (p.categoria && p.categoria.toLowerCase().includes(lowerQuery)));
        } else {
          this.listProductos = data;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }

  agregarAlCarrito(producto: Product): void {
    this.cartService.addToCart(producto);
  }
}
