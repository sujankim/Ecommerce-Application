import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderDetailsModel } from '../_model/order-detail.model';
import { ProductModel } from '../_model/product.model';
import { ProductService } from '../_services/product';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-buy-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './buy-product.html',
  styleUrls: ['./buy-product.scss']
})
export class BuyProduct implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private destroyRef = inject(DestroyRef);

  productDetails: ProductModel[] = [];
  displayedColumns = ['name', 'price', 'quantity', 'total'];
  isSubmitting = false;

  orderDetails: OrderDetailsModel = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  };

  ngOnInit(): void {
    const data = this.route.snapshot.data['productDetails'];
    if (!data) return;

    this.productDetails = data;

    this.orderDetails.orderProductQuantityList = this.productDetails.map(p => ({
      productId: p.productId!,
      orderQuantity: 1
    }));
  }

  getQuantityForProduct(productId: number | null): number {
    return this.orderDetails.orderProductQuantityList
      .find(i => i.productId === productId)?.orderQuantity ?? 1;
  }

  onQuantityChanged(quantity: number, productId: number) {
    const item = this.orderDetails.orderProductQuantityList
      .find(i => i.productId === productId);

    if (item) item.orderQuantity = quantity;
  }

  getCalculatedTotal(productId: number | null, price: number): number {
    return this.getQuantityForProduct(productId) * price;
  }

  getCalculatedGrandTotal(): number {
    return this.productDetails.reduce((sum, p) =>
      sum + this.getCalculatedTotal(p.productId, p.productDiscountedPrice), 0);
  }

  placeOrder(form: NgForm) {
    if (form.invalid) return;

    this.isSubmitting = true;

    this.productService.placeOrder(this.orderDetails)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          form.reset();
        },
        error: () => this.isSubmitting = false
      });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
