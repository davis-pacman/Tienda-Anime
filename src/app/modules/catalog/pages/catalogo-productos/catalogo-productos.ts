import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { Producto } from '../../../../core/model/producto.interface';
import { ProductService } from '../../../../core/services/product-service';

@Component({
  selector: 'app-catalogo-productos',
  imports: [RouterLink, DecimalPipe, NgOptimizedImage, CommonModule],
  templateUrl: './catalogo-productos.html',
  styleUrl: './catalogo-productos.css',
})
export class CatalogoProductos implements OnInit {
  private productoservice = inject(ProductService);

  listProductos: Producto[] = [];

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoservice.getProductos().subscribe({
      next: (data) => {
        this.listProductos = data;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      },
    });
  }


}
