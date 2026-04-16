import {FileHandle} from './file-handle.model';

export interface ProductModel{
  productId: number | null,
  productName: string,
  productDescription: string,
  productDiscountedPrice: number,
  productActualPrice: number,
  productImages: FileHandle[]

}
