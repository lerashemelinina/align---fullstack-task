import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges  } from "@angular/core";
import { ImageModel } from "src/models/image.model";



@Component({
    selector: 'img-tabs',
    templateUrl: './img-tabs.component.html',
    styleUrls: ['./img-tabs.component.css']
  })
  export class ImageTabsComponent implements OnInit, OnChanges {
      
    @Input()
    images: ImageModel[];

    @Input()
    maxNum = 5;

    @Output()
    selectedImgEvent = new EventEmitter<ImageModel>();

    startIndex = 0;

    endIndex: number;

    displayedImages:ImageModel[];

    ngOnInit(): void {
      this.endIndex = this.maxNum;

      this.setDisplayedImages();
    }


    emitSelectedImg(image: ImageModel) {
      this.selectedImgEvent.emit(image);
    }


    moveLeft() {
      if(this.startIndex>0) {
        this.startIndex--;
        this.endIndex--;
        this.displayedImages = this.images.slice(this.startIndex, this.endIndex);
      }
    }

    moveRight() {
      if(this.endIndex<this.images.length) {
        this.endIndex++;
        this.startIndex++;
        this.displayedImages = this.images.slice(this.startIndex, this.endIndex);
      }
    }

    setDisplayedImages() {
      if(this.images.length > this.maxNum) {
        this.displayedImages = this.images.slice(this.startIndex, this.endIndex);
      } else {
        this.displayedImages = this.images;
      }
    }

    ngOnChanges(changes: SimpleChanges): void {

        if(changes['images']) {
          this.setDisplayedImages();
        }
    }
 
  }