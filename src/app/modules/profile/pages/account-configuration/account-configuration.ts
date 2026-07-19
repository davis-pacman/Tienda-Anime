import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { StoreDataService } from '../../../../core/services/store-data-service';
import { Order } from '../../../../core/model/order.interface';

@Component({
  selector: 'app-account-configuration',
  imports: [CommonModule, RouterLink],
  templateUrl: './account-configuration.html',
})
export class AccountConfiguration implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly storeDataService = inject(StoreDataService);
  private readonly router = inject(Router);

  public user = this.authService.currentUser;
  
  public orders = signal<Order[]>([]);
  public loadingOrders = signal<boolean>(true);

  private userEffect = effect(() => {
    const currentUser = this.user();
    if (currentUser?.correo) {
      this.fetchOrders(currentUser.correo);
    } else {
      this.loadingOrders.set(false);
    }
  });

  ngOnInit(): void {
    // handled by effect
  }

  fetchOrders(correo: string) {
    this.storeDataService.getOrdersByEmail(correo).subscribe({
      next: (orders) => {
        this.orders.set(orders);
        this.loadingOrders.set(false);
      },
      error: (err) => {
        console.error('Error fetching orders', err);
        this.loadingOrders.set(false);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
