import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Posts } from '../posts.datatype';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  @Input() public posts: Posts.IPost[] | null | undefined;
  @Output() public onDeletePostById: EventEmitter<string> =
    new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  public deleteById(id: string): void {
    this.onDeletePostById.emit(id);
  }
}
