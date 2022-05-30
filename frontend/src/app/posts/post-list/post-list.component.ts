import { Component, Input, OnInit } from '@angular/core';
import { Posts } from '../posts.datatype';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  @Input() public posts: Posts.IPost[] | null | undefined;
  constructor() {}

  ngOnInit(): void {}
}
