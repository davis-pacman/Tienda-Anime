import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductService } from '../../../../core/services/product-service';
import { Product } from '../../../../core/model/product.interface';
import { CartService } from '../../../../core/services/cart-service';
import { CategoryService } from '../../../../core/services/category-service';
import { Category } from '../../../../core/model/category.interface';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgOptimizedImage, CommonModule],
  templateUrl: './home.html',

  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly productoservice = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly cartService = inject(CartService);

  listProductos: Product[] = [];
  categorias: Category[] = [];

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerProductos();
  }

  obtenerCategorias() {
    this.categoryService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
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

  agregarAlCarrito(producto: Product): void {
    this.cartService.addToCart(producto);
  }
}
