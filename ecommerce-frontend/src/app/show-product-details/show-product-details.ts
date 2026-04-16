import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ProductService } from '../_services/product';
import { ShowProductImagesDialog } from '../show-product-images-dialog/show-product-images-dialog';
import { ProductModel } from '../model/product.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-show-product-details',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './show-product-details.html',
  styleUrl: './show-product-details.scss'
})
export class ShowProductDetails implements OnInit {
  productDetails: ProductModel[] = [];
  isLoading = false;

  displayedColumns: string[] = [
    'Id',
    'Product Name',
    'description',
    'Product Discounted Price',
    'Product Actual Price',
    'Actions'
  ];

  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

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

  deleteProduct(productId: string | number): void {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(productId).subscribe({
      next: () => this.loadProducts(),
      error: (err: HttpErrorResponse) => console.error('Delete failed:', err)
    });
  }

  showImages(product: ProductModel): void {
    this.dialog.open(ShowProductImagesDialog, {
      data: { images: product.productImages },
      height: '500px',
      width: '800px',
      panelClass: 'image-dialog-panel'
    });
  }

  viewProductDetails(productId: string | number): void {
    this.router.navigate(['/product', productId]);
  }

  editProductDetails(productId: string | number): void {
    this.router.navigate(['/addNewProduct'], { queryParams: { productId } });
  }
}
