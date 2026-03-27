import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostServices } from '../../services/post/post-services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-post',
  standalone: false,
  templateUrl: './add-new-post.html',
  styleUrl: './add-new-post.css'
})
export class AddNewPost implements OnInit {
  postForm: FormGroup;
  isEditMode = false;
  postId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private postServices: PostServices,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute 
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    
    if (this.postId) {
      this.isEditMode = true;
      this.loadPostData(this.postId);
    }
  }

  loadPostData(id: string) {
    this.postServices.getPostById(id).subscribe({
      next: (post) => {
        // Fix: Removed .imgUrl to match your interface IPost
        this.postForm.patchValue({
          title: post.title,
          content: post.content,
          imageUrl: post.imageUrl 
        });
      },
      error: (err) => {
        this.toastr.error('Could not load post data');
        this.router.navigate(['']);
      }
    });
  }

  onSubmit() {
    if (this.postForm.invalid) {
      this.toastr.error('Please fill in all required fields');
      return;
    }

    if (this.isEditMode && this.postId) {
      this.postServices.updatePost(this.postId, this.postForm.value).subscribe({
        next: () => {
          this.toastr.success('Post updated successfully');
          this.router.navigate(['/myposts']);
        },
        error: (err) => {
          console.error('Update failed', err);
          this.toastr.error('Update failed');
        }
      });
    } else {
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
    }
  }
}
