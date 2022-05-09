import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Photo } from '../interfaces/photo.interface';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})

export class GeneralService {
  url: string = 'https://jsonplaceholder.typicode.com/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getPhotos(): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.url + 'photos').pipe(retry(1));
  }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.url + 'posts').pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}

