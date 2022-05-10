import { Photo } from '../models/photo.model';
import { Post } from '../models/post.model';

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})

export class GeneralService {
  url: string = 'https://jsonplaceholder.typicode.com/';

  http: HttpClient

  constructor(http: HttpClient) {
    this.http = http;
  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.url + 'photos');
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url + 'posts');
  }
}

