import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product-service';
import { Product } from '../../../../core/model/product.interface';
import { CartService } from '../../../../core/services/cart-service';

@Component({
  selector: 'app-detail-product',
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-product.html',
  styles: ``,
})
export class DetailProduct implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  producto?: Product;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductoById(id).subscribe((data) => {
      this.producto = data;
    });
  }

  agregarAlCarrito(): void {
    if (this.producto) {
      this.cartService.addToCart(this.producto);
    }
  }
}
