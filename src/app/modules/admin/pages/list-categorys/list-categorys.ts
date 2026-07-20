import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../../core/services/category-service';
import { Category } from '../../../../core/model/category.interface';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product-service';
import { Product } from '../../../../core/model/product.interface';

@Component({
  selector: 'app-list-categorys',
  imports: [RouterLink],
  templateUrl: './list-categorys.html',
  styles: ``,
})
export class ListCategorys implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private cdr = inject(ChangeDetectorRef);

  prodCat: Product[] = [];
  listCategorias: Category[] = [];

  ngOnInit() {
    this.categoryService.getCategorias().subscribe({
      next: (data) => {
        this.listCategorias = data;
        this.cdr.detectChanges();
      }, error: (err) => { console.error('Error al obtener las categorias', err) }
    });
  }

  eliminarCategoria(id: string | undefined, nombre: string) {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.productService.getProductsByCategories(nombre).subscribe({
        next: (data) => {
          this.prodCat = data;
          this.cdr.detectChanges();

          console.log(this.prodCat);
        },
        error: (err) => {
          console.error('Error al obtener productos:', err);
        }
      });

      if (this.prodCat.length === 0) {
        this.categoryService.deleteCategory(id).subscribe(() => {
          // Filtramos la lista local para no recargar toda la página
          this.listCategorias = this.listCategorias.filter(c => c.id !== id);
          this.cdr.detectChanges();
        });
      } else {
        alert('No se puede eliminar esta categoria porque tiene productos relacionados');
      }

    }
  }
}