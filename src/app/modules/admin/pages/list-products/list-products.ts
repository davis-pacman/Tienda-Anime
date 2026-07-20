import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../../core/model/product.interface';
import { ProductService } from '../../../../core/services/product-service';
import { RouterLink } from '@angular/router';
import { Category } from '../../../../core/model/category.interface';
import { CategoryService } from '../../../../core/services/category-service';

@Component({
  selector: 'app-list-products',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-products.html',
})
export class ListProducts implements OnInit {
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

  listProductos: Product[] = [];

  categorias?: Category[];

  filtroBusqueda: string = '';
  categoriaSeleccionada: string = '';
  stockSeleccionado: string = '';


  ngOnInit(): void {
    this.listarCategorias();

    this.obtenerProductos();
  }

  listarCategorias() {
    this.categoryService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cdr.detectChanges();
      },
      error: (err) => { console.error('Error al obtener las categorias', err) }
    });
  }

  obtenerProductos() {
    this.productService.getProductos().subscribe({
      next: (data) => {
        this.listProductos = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }



  eliminarProducto(id?: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto del inventario?')) {
      this.productService.deleteProducto(id).subscribe({
        next: () => {
          // Opción A: Refrescar la lista filtrando el elemento eliminado
          this.listProductos = this.listProductos.filter(p => p.id !== id);
          console.log('Producto eliminado');
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al eliminar', err);
          alert('No se pudo eliminar el producto.');
        }
      });
    }
  }
}

