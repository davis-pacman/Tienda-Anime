import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductoById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
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
}