import { Component, OnInit } from '@angular/core';
import { Observable, of, take, tap } from 'rxjs';
import { Posts } from './posts.datatype';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public posts$: Observable<Posts.IPost[]> = of([]);

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.posts$ = this.postsService.posts$;
  }

  public deletePostById(id: string): void {
    this.postsService.deleteById(id).pipe(take(1)).subscribe();
  }
}
