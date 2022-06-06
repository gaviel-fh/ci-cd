import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Posts } from './posts.datatype';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly URL = '/api/v1/posts';
  private postsSubject: BehaviorSubject<Posts.IPost[]> = new BehaviorSubject<
    Posts.IPost[]
  >([]);
  public posts$: Observable<Posts.IPost[]> = this.postsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getAll$().subscribe((posts) => this.postsSubject.next(posts));
  }

  public getAll$(): Observable<Posts.IPost[]> {
    return this.http.get<Posts.IPostBackendResult>(this.URL).pipe(
      map((value) => {
        return this.mapBackendPostToPost(value.data.posts);
      }),
      catchError((error: Error) => {
        console.log('ERROR: ', error);
        return of([]);
      })
    );
  }

  public create$(postData: Posts.PostData): Observable<void> {
    return this.http.post<Posts.PostData>('/api/v1/posts', postData).pipe(
      tap(() => this.reloadPosts()),
      map(() => void 0)
    );
  }

  public deleteById(id: string): Observable<void> {
    return this.http.delete<Posts.IPost>(`${this.URL}/${id}`).pipe(
      tap(() => this.reloadPosts()),
      map(() => void 0)
    );
  }

  private mapBackendPostToPost(
    backendPosts: Posts.IBackendPost[]
  ): Posts.IPost[] {
    return backendPosts.map((backendPost) => ({
      title: backendPost.title,
      body: backendPost.body,
      id: backendPost._id,
    }));
  }

  private reloadPosts(): void {
    this.getAll$().subscribe((posts) => this.postsSubject.next(posts));
  }
}
