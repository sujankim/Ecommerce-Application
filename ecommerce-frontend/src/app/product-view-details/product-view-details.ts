import {Component, HostListener, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ProductModel } from '../_model/product.model';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-product-view-details',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatDividerModule,
    MatIcon
  ],
  templateUrl: './product-view-details.html',
  styleUrl: './product-view-details.scss'
})
export class ProductViewDetails implements OnInit {
  product!: ProductModel;
  selectedImageIndex = 0;
  isZoomOpen = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.product = this.route.snapshot.data['product'];
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  openImageZoom(): void {
    if (this.product.productImages.length > 0) this.isZoomOpen = true;
  }

  closeImageZoom(): void {
    this.isZoomOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isZoomOpen) this.closeImageZoom();
  }

  buyProduct(productId: string | number | null): void {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: true, id: productId
    }]);
  }

  addToCart(productId: string | number | null): void {
    console.log('🛍️ Adding to cart ID:', productId);
  }

}
