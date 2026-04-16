import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-show-product-images-dialog',
  imports: [
    MatGridListModule
  ],
  templateUrl: './show-product-images-dialog.html',
  styleUrls: ['./show-product-images-dialog.scss']
})
export class ShowProductImagesDialog implements OnInit {

  data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages(){
    console.log(this.data.images);
  }


}
