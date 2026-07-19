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

}