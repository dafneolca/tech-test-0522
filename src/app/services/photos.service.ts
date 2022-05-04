import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PhotosService {
  url: string = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private httpClient: HttpClient) {}

  getPhotos(): Observable<any> {
    return this.httpClient.get(this.url);
  }
}

