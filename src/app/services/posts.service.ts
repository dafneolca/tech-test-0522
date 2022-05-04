import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PostsService {
  url: string = 'https://jsonplaceholder.typicode.com/posts';

  // // define custom header for api requests (can be extended in the child-service)
  // protected jsonHeaders = {
  //   headers: HelperService.getDefaultHeaders(),
  // };

  constructor(private httpClient: HttpClient) {}

  // findOne(itemId: string): Observable<DetailResponse<any>> {
  //   return this.httpClient.get<DetailResponse<any>>(
  //     `${this.url}/${itemId}`,
  //     this.jsonHeaders
  //   );
  // }

  getPosts(): Observable<any> {
    return this.httpClient.get(this.url);
  }
}

