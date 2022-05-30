import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { Posts } from './posts.datatype';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly URL = '/api/v1/posts';

  constructor(private http: HttpClient) {}

  public getAllPosts$(): Observable<Posts.IPost[]> {
    return this.http.get<Posts.IPost[]>(this.URL).pipe(
      catchError((error: Error) => {
        console.log('ERROR: ', error);
        return of([]);
      })
    );
  }
}
