import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ImageTabsComponent } from "./img-tabs/img-tabs.component";
import { SlideshowGalleryComponent } from "./slideshow-gallery.component";

@NgModule({
    declarations: [
        SlideshowGalleryComponent, 
        ImageTabsComponent
    ],
    imports: [
      BrowserModule
    ],
    exports: [SlideshowGalleryComponent]
  })
  export class SlideshowGalleryModule { }