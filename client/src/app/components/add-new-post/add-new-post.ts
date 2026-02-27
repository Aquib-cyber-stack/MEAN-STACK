import { Component } from '@angular/core';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { PostServices } from '../../services/post/post-services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-post',
  standalone: false,
  templateUrl: './add-new-post.html',
  styleUrl: './add-new-post.css'
})
export class AddNewPost {
  postForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private postServices: PostServices,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      imageUrl: ['']
    });
  }
  onSubmit() {
    if (this.postForm.valid) {
      this.postServices.createPost(this.postForm.value).subscribe({
        next: (res) => {
          this.toastr.success('Post created successfully');
          this.postForm.reset();
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Post creation failed', err);
          this.toastr.error('Post creation failed');
        }
      });
    } else {
      this.toastr.error('Please fill in all required fields');
      console.log('Form is invalid');
    }
  }
}
