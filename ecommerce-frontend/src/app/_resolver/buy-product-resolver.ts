import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  RedirectCommand,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { ProductModel } from '../_model/product.model';
import { ProductService } from '../_services/product';
import { map } from 'rxjs';
import { ImageProcessingService } from '../_services/image-processing';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<ProductModel[]> {

  private productService = inject(ProductService);
  private imageProcessingService = inject(ImageProcessingService);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<ProductModel[] | RedirectCommand> {

    const id = route.paramMap.get("id")!;
    const isSingleProductCheckout =
      route.paramMap.get("isSingleProductCheckout") == "true";

    return this.productService
      .getProductDetails(isSingleProductCheckout, id)
      .pipe(
        map((products: ProductModel[]) =>
          products.map((product: ProductModel) => ({
            ...product,
            productImages: this.imageProcessingService.createImages(product)
          }))
        )
      );
  }
}
