import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { SlideshowGalleryModule } from 'src/components/slideshow-gallery/slideshow-gallery.module';

@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    CommonModule,
    SlideshowGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
