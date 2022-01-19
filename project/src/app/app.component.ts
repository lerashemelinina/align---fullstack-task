import { Component } from '@angular/core';
import { Subscription, switchMap, timer } from 'rxjs';
import { ImageModel } from 'src/models/image.model';
import { RestApiService } from 'src/services/rest-api.sevice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  images: ImageModel[];

  timeOut: any;

  subscription: Subscription;
 
  constructor(private restApiService: RestApiService) {}

  ngOnInit(): void {
    this.restApiService.getImages(5).subscribe(res => this.images = res);
  }

  initTimeOut() {
    this.timeOut = setTimeout(() => {

      this.subscription = timer(0, 30000)
      .pipe(
        switchMap(()=> {
          return this.restApiService.getImages(10)
        })
      )
      .subscribe(data => {
        this.images = data;
      })
    }, 10000);
  }

  stopTimeOut() {
    clearTimeout(this.timeOut);

    this.subscription && this.subscription.unsubscribe();
  }

}
