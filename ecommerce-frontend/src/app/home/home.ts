import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductService } from '../_services/product';
import { ProductModel } from '../model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private productService = inject(ProductService);
  private router: Router = inject(Router);

  productDetails: ProductModel[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProductsWithImages().subscribe({
      next: (products: ProductModel[]) => {
        this.productDetails = products;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to load products:', err);
      },
      complete: () => (this.isLoading = false)
    });
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    const placeholder = img.parentElement?.querySelector('.no-image');
    if (placeholder) {
      placeholder.classList.remove('hidden');
    }
  }

  showProductDetails(productId: string | number | null): void {
    this.router.navigate(['/productViewDetails', {productId: productId}]);
  }
}
