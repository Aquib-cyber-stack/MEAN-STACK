import { Component } from '@angular/core';
import { PostServices } from '../../services/post/post-services';
import { IPost } from '../../interfaces/postInterface';

@Component({
  selector: 'app-my-posts',
  standalone: false,
  templateUrl: './my-posts.html',
  styleUrl: './my-posts.css'
})
export class MyPosts {
  constructor(private postServices: PostServices) {}

  posts: IPost[] = [];

  ngOnInit() {
    this.postServices.getPostsByUser().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
      }
    });
  }
}
