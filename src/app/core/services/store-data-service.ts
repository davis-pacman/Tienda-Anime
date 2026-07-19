import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BlogPosts } from '../model/blog-posts.interface';
import { SupportTicket } from '../model/support-ticket.interface';
import { Order } from '../model/order.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreDataService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) { }

  getBlogPosts(): Observable<BlogPosts[]> {
    return this.http.get<BlogPosts[]>(`${this.baseUrl}/blogPosts`);
  }

  getBlogPostBySlug(slug: string): Observable<BlogPosts | undefined> {
    return this.http.get<BlogPosts[]>(`${this.baseUrl}/blogPosts?slug=${slug}`).pipe(map((posts) => posts[0]));
  }

  saveSupportTicket(ticket: SupportTicket): Observable<SupportTicket> {
    return this.http.post<SupportTicket>(`${this.baseUrl}/supportTickets`, {
      ...ticket,
      estado: 'abierto',
      fecha: new Date().toISOString(),
    });
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders`, {
      ...order,
      estado: 'confirmado',
      fecha: new Date().toISOString(),
    });
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/orders/${id}`);
  }

  getOrdersByEmail(email: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders?correo=${email}`);
  }
}
