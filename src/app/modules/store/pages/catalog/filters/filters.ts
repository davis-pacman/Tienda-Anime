import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Products } from "../products/products";
import { RouterLink } from "@angular/router";
import { FilterService } from '../../../../../core/services/filter-service';
import { Category } from '../../../../../core/model/category.interface';
import { CategoryService } from '../../../../../core/services/category-service';

@Component({
  selector: 'app-filters',
  imports: [Products],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class Filters implements OnInit {
  private filterService = inject(FilterService);
  private categoryService = inject(CategoryService);
  private cdr = inject(ChangeDetectorRef);

  categorySig = this.filterService.categoryAtual();

  listCategorias: Category[] = [];

  ngOnInit(): void {
    this.categoryService.getCategorias().subscribe({
      next: (data) => {
        this.listCategorias = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }

  ObtenerCategorias(): void {

  }

  filtrar(cat: string) {
    this.filterService.updateCategory(cat);

    this.categorySig = this.filterService.categoryAtual();
  }
}
