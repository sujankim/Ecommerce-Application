import { inject, Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot} from '@angular/router';
import { ProductModel } from '../_model/product.model';
import { map, of, Observable } from 'rxjs';
import { ProductService } from '../_services/product';
import { ImageProcessingService } from '../_services/image-processing';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<ProductModel> {
  private productService: ProductService = inject(ProductService);
  private imageProcessingService: ImageProcessingService = inject(ImageProcessingService);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<ProductModel | RedirectCommand> {
    const id = route.paramMap.get('productId');

    if (id) {
      // fetch product detail from backend
      return this.productService.getProductById(id).pipe(
        map((product: ProductModel) => {
          if (product.productImages && product.productImages.length > 0) {
            const processedImages = this.imageProcessingService.createImages(product);
            return {
              ...product,
              productImages: processedImages
            };
          }
          return product;
        })
      );
    } else {
      // return empty product observable
      return of(this.getProductDetails());
    }
  }

  private getProductDetails(): ProductModel {
    return {
      productId: null,
      productName: '',
      productDescription: '',
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: [],
    };
  }
}
