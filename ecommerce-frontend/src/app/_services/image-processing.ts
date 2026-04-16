import {inject, Injectable} from '@angular/core';
import {ProductModel} from '../model/product.model';
import {FileHandle} from '../model/file-handle.model';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  private sanitizer: DomSanitizer = inject(DomSanitizer);

  public createImages(product: ProductModel){
    const productImages: any[] = product.productImages;

    const productImageToFileHandle: FileHandle[] = [];

    for(let i = 0; i < productImages.length; i++){
      const imageFileData = productImages[i];

      const imageBlob = this.dataURLtoBlob(imageFileData.picByte, imageFileData.type);

      const imageFile = new File([imageBlob], imageFileData.imageName, { type: imageFileData.type });

      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile)),
        urlString: window.URL.createObjectURL(imageFile)
      };

      productImageToFileHandle.push(finalFileHandle);
    }

    product.productImages = productImageToFileHandle;
    return productImageToFileHandle;
  }

  public dataURLtoBlob(picByte: any, imageType: any){
    const byteString = window.atob(picByte);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i< byteString.length; i++){
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], {type: imageType});
  }
}
