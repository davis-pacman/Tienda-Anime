import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/productos';

  private http = inject(HttpClient);

  getProductos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductoBySlug(slug: string): Observable<Product | null> {
    return this.http.get<Product[]>(`${this.baseUrl}?slug=${slug}`).pipe(
      map((productos: Product[]) => {
        return productos.length > 0 ? productos[0] : null;
      })
    );
  }

  createProducto(producto: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, producto);
  }

  updateProducto(id: number, producto: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, producto);
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getProductsByCategories(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}?categoria=${category}`);
  }

}