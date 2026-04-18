import {inject, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductModel} from '../_model/product.model';
import {map, Observable} from 'rxjs';
import {ImageProcessingService} from './image-processing';
import {OrderDetailsModel} from '../_model/order-detail.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  private baseUrl = 'http://localhost:9090';

  private httpClient: HttpClient = inject(HttpClient);
  private imageProcessingService = inject(ImageProcessingService);

  constructor() {
  }

  getAllProductsWithImages(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(`${this.baseUrl}/api/products`).pipe(
      map((products: ProductModel[]) =>
        products.map((product: ProductModel) => {
          // Create new object to avoid mutating original
          return {
            ...product,
            productImages: this.imageProcessingService.createImages(product)
          };
        })
      )
    );
  }

  public addProduct(product: FormData){
    return this.httpClient.post<ProductModel>(`${this.baseUrl}/api/products`, product);
  }

  public getAllProducts(): Observable<ProductModel[]>{
    return this.httpClient.get<ProductModel[]>(`${this.baseUrl}/api/products`);
  }

  public getProductById(productId: string){
    return this.httpClient.get<ProductModel>(`${this.baseUrl}/api/products/${productId}`);
  }

  public deleteProduct(productId: string | number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/api/products/${productId}`);
  }

  public getProductDetails(isSingleProductCheckout: boolean, productId: String): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(
      `${this.baseUrl}/api/products/getProductDetails/${isSingleProductCheckout}/${productId}`
    );
  }

  public placeOrder(orderDetails: OrderDetailsModel){
    return this.httpClient.post(`${this.baseUrl}/api/placeOrder`, orderDetails, {responseType: 'text'});
  }

}
