import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ProductModel } from '../model/product.model';

@Component({
  selector: 'app-product-view-details',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './product-view-details.html',
  styleUrl: './product-view-details.scss'
})
export class ProductViewDetails implements OnInit {
  product!: ProductModel;
  selectedImageIndex = 0;

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.product = this.route.snapshot.data['product'];
    console.log('✅ Product loaded:', this.product.productName);
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  buyProduct(productId: string | number | null): void {
    console.log('🛒 Processing checkout for ID:', productId);
  }

  addToCart(productId: string | number | null): void {
    console.log('🛍️ Adding to cart ID:', productId);
  }
}
