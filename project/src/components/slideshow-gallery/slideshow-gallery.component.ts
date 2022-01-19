import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ImageModel } from 'src/models/image.model';

@Component({
  selector: 'slideshow-gallery',
  templateUrl: './slideshow-gallery.component.html',
  styleUrls: ['./slideshow-gallery.component.css']
})
export class SlideshowGalleryComponent implements OnInit, OnChanges {

  @Input()
  images: ImageModel[];

  selectedImg: ImageModel;

  maxNum = 5;

  showAuthor = false;

  constructor() {}

  ngOnInit() {
    this.setSelectedImg();
  }
  
  setSelectedImg() {
    this.selectedImg=this.images[Math.floor(this.maxNum/2)];
  }

  updateSelectedImg(img: ImageModel) {
    this.selectedImg = img;
  }

  ngOnChanges(changes: SimpleChanges): void {

      if(changes['images']) {
        this.setSelectedImg();
      }
  }
 
}