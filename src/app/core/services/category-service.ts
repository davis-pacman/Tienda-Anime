import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/categorias';

  private readonly http = inject(HttpClient);

  getCategorias(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  getCategoryById(id: string): Observable<Category | null> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  createCategory(categoria: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, categoria);
  }

  updateCategory(id: string, categoria: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${id}`, categoria);
  }

  deleteCategory(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}