import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';

type PostData = { title: string; body: string };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.initializeForm();
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  public onSubmit(): void {
    const postData = this.extractPostData(this.form);
    this.http
      .post<PostData>('/api/v1/posts', postData)
      .pipe(take(1))
      .subscribe();
  }

  private extractPostData(form: FormGroup): PostData {
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
