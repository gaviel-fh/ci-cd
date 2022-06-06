import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Posts } from './posts/posts.datatype';
import { PostsService } from './posts/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private postsService: PostsService) {
    this.form = this.initializeForm();
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  public onSubmit(): void {
    const postData = this.extractPostData(this.form);

    this.postsService.create$(postData).subscribe();
  }

  private extractPostData(form: FormGroup): Posts.PostData {
    return {
      title: this.form.get('title')?.value,
      body: this.form.get('body')?.value,
    };
  }

  private initializeForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }
}
