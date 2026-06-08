import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../model/producto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl);
  }

  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/${id}`);
  }

  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.baseUrl, producto);
  }

  updateProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.baseUrl}/${id}`, producto);
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}