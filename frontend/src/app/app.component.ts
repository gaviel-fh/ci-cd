import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Posts } from './posts/posts.datatype';
import { PostsService } from './posts/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public form: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private postsService: PostsService) {
    this.form = this.initializeForm();
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  public onSubmit(): void {
    const postData = this.extractPostData(this.form);

    this.postsService.create$(postData).subscribe();
  }

  private extractPostData(form: UntypedFormGroup): Posts.PostData {
    return {
      title: this.form.get('title')?.value,
      body: this.form.get('body')?.value,
    };
  }

  private initializeForm(): UntypedFormGroup {
    return this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }
}
