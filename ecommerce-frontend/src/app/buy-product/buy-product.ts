import {Component, inject, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {OrderDetailsModel} from '../_model/order-detail.model';
import {ActivatedRoute} from '@angular/router';
import {ProductModel} from '../_model/product.model';
import {ProductService} from '../_services/product';

@Component({
  selector: 'app-buy-product',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './buy-product.html',
  styleUrl: './buy-product.scss'
})
export class BuyProduct implements OnInit {

  productDetails: ProductModel[] = [];

  orderDetails: OrderDetailsModel = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  };

  private activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductService);

  ngOnInit(): void {
      this.productDetails = this.activatedRoute.snapshot.data['productDetails'];

    this.orderDetails.orderProductQuantityList = this.productDetails
      .filter(p => p.productId != null)
      .map(p => ({
        productId: p.productId!,
        orderQuantity: 1
      }));

      console.log(this.productDetails);
      console.log(this.orderDetails);
  }

  public placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
