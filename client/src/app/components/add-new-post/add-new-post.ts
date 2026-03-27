import { Component, OnInit } from '@angular/core'; // Added OnInit
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostServices } from '../../services/post/post-services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router'; // Added ActivatedRoute

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
    private route: ActivatedRoute // Injected route to get the ID
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit() {
    // Check if an ID exists in the URL
    this.postId = this.route.snapshot.paramMap.get('id');
    
    if (this.postId) {
      this.isEditMode = true;
      this.loadPostData(this.postId);
    }
  }

  loadPostData(id: string) {
    this.postServices.getPostById(id).subscribe({
      next: (post) => {
        // Pre-fill the form with existing data
        this.postForm.patchValue({
          title: post.title,
          content: post.content,
          imageUrl: post.imgUrl || post.imageUrl
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
      // Logic for Update
      this.postServices.updatePost(this.postId, this.postForm.value).subscribe({
        next: () => {
          this.toastr.success('Post updated successfully');
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Update failed', err);
          this.toastr.error('Update failed');
        }
      });
    } else {
      // Logic for Create
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
