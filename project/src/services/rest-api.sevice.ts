import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ImageModel } from "src/models/image.model";

@Injectable({
    providedIn: 'root'
  })
  export class RestApiService {

    constructor(private http: HttpClient) { }

    apiURL = 'https://localhost:44387/api';
    
    getImages(size: number): Observable<ImageModel[]> {

      const params = new HttpParams().set('num', size);

        return this.http.get<ImageModel[]>(this.apiURL + '/images', {params})
          .pipe(
            map( images => {

              if(images && images.length>0) {
                images.forEach(image => {
                  image.thumbnail_url = 'https://picsum.photos/id/' + image.id + '/' + 140;
  
                  image.medium_size_url = 'https://picsum.photos/id/' + image.id + '/' + 1000 + '/' + 600;
                });
              }

              return images;
            })
          )
    }

  }