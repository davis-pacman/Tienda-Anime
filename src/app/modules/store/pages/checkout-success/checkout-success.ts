import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StoreDataService } from '../../../../core/services/store-data-service';
import { Order } from '../../../../core/model/order.interface';

@Component({
  selector: 'app-checkout-success',
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout-success.html',

  styleUrl: './checkout-success.css',
})
export class CheckoutSuccess implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly storeDataService = inject(StoreDataService);
  
  orderId = this.route.snapshot.paramMap.get('orderId');
  order = signal<Order | null>(null);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    if (this.orderId) {
      this.storeDataService.getOrderById(this.orderId).subscribe({
        next: (data) => {
          this.order.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error fetching order', err);
          this.loading.set(false);
        }
      });
    } else {
      this.loading.set(false);
    }
  }
}
