import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../model/product.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = 'http://localhost:3000/productos';

  private readonly http = inject(HttpClient);

  getProductos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductoById(id: string): Observable<Product | null> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
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

  updateProducto(id: string, producto: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, producto);
  }

  deleteProducto(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getProductsByCategories(category: string): Observable<Product[]> {
    const params = new HttpParams().set('categoria', category);


    return this.http.get<Product[]>(`${this.baseUrl}`, { params });
  }

}