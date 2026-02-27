import { Component } from '@angular/core';
import { PostServices } from '../../services/post/post-services';
import { IPost } from '../../interfaces/postInterface';

@Component({
  selector: 'app-all-posts',
  standalone: false,
  templateUrl: './all-posts.html',
  styleUrl: './all-posts.css'
})
export class AllPosts {
  posts: IPost[] = [];
  loading: boolean = true;

  constructor(private postServices: PostServices) {
    this.loadPosts();
  }

  loadPosts() {
    this.postServices.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
        this.loading = false;
      }
    });
  }
}
