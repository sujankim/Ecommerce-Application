import {Component, inject, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ProductModel} from '../model/product.model';
import {FormsModule, NgForm} from '@angular/forms';
import {ProductService} from '../_services/product';
import { HttpErrorResponse } from '@angular/common/http';
import {FileHandle} from '../model/file-handle.model';
import {DomSanitizer} from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';
import {DragDirective} from '../drag-directive/drag';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatGridListModule,
    DragDirective
  ],
  templateUrl: './add-new-product.html',
  styleUrls: ['./add-new-product.scss']
})
export class AddNewProduct implements OnInit {
  isNewProduct = true;

  product: ProductModel = {
    productId: null,
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: [],
  }

  private productService: ProductService = inject(ProductService);
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
  }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];

    if(this.product && this.product.productId) {
      this.isNewProduct = false;
    }
  }

  addProduct(productForm: NgForm) {
    const productFormData = this.prepareFormData(this.product);

    this.productService.addProduct(productFormData).subscribe({
      next: (res: ProductModel) => {
        productForm.reset();
        this.product.productImages = [];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  prepareFormData(product: ProductModel): FormData {
    const formData = new FormData();


    const productData = {
      productId: product.productId,
      productName: product.productName,
      productDescription: product.productDescription,
      productDiscountedPrice: product.productDiscountedPrice,
      productActualPrice: product.productActualPrice

    };

    formData.append('product', JSON.stringify(productData));

    for(let i = 0; i < product.productImages.length; i++) {
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }

    return formData;
  }

  onFileSelected(event: any) {
    if(event.target.files && event.target.files.length > 0){
      const file = event.target.files[0];
      const objectUrl = URL.createObjectURL(file);

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(objectUrl),
        urlString: objectUrl
      };

      this.product.productImages.push(fileHandle);
      event.target.value = '';
    }
  }

  clearForm(productForm: NgForm) {
    this.product.productImages.forEach(fileHandle => {
      if (fileHandle.urlString) {
        URL.revokeObjectURL(fileHandle.urlString);
      }
    });

    productForm.reset();
    this.product = {
      productId: null,
      productName: "",
      productDescription: "",
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: [],
    };
  }

  removeImage(i: number){
    const fileHandle = this.product.productImages[i];
    if (fileHandle.urlString) {
      URL.revokeObjectURL(fileHandle.urlString);
    }

    this.product.productImages.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle) {
    this.product.productImages.push(fileHandle);
  }
}
