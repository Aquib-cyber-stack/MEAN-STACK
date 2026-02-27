import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IPost } from '../../interfaces/postInterface';
import { CommentServices } from '../../services/comment/comment-services';
import { ToastrService } from 'ngx-toastr';
import { IComment } from '../../interfaces/commentInterface';
import { PostServices } from '../../services/post/post-services';
import { ChangeDetectorRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-post-card',
  standalone: false,
  templateUrl: './post-card.html',
  styleUrl: './post-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCard implements OnInit {
  showComments: boolean = false;
  newComment: string = '';
  checked !: boolean;

  @Input() post!: IPost;
  @Input() myPost!: boolean;
  comments: IComment[] = [];
  user: any;

  constructor(
    private commentService: CommentServices,
    private toastr: ToastrService,
    private postServices: PostServices,
    private cdRef: ChangeDetectorRef,
    private cookieService: CookieService
  ) {}

  
  ngOnInit() {
    this.getComments();
    this.checked = this.post.isLiked || false;
    this.user = JSON.parse(this.cookieService.get('user') || '{}');
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  addComment() {
    if (this.newComment.trim()) {
      const comment = {
        content: this.newComment
      };
      this.commentService.createComment(comment, this.post._id).subscribe({
        next: () => {
          this.toastr.success('Comment added successfully');
          this.newComment = '';
          this.getComments(); // Refresh to include new comment
        },
        error: (err) => {
          this.toastr.error('Failed to add comment');
          console.error('Error adding comment:', err);
        }
      });
    }
  }

  getComments() {
    this.commentService.getComments(this.post._id).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.post.comments = comments;
        this.cdRef.markForCheck();
      },
      error: (err) => {
        this.toastr.error('Failed to load comments');
        console.error('Error loading comments:', err);
      }
    });
  }

  deletePost() {
    this.postServices.deleteMyPost(this.post._id).subscribe({
      next: () => {
        this.toastr.success('Post deleted successfully');
        window.location.reload();
      },
      error: (err) => {
        this.toastr.error('Failed to delete post');
        console.error('Error deleting post:', err);
      }
    });
  }

  likeButton() {
    const action = this.checked
      ? this.postServices.unlikePost(this.post._id)
      : this.postServices.likePost(this.post._id);

    action.subscribe({
      next: () => {
        this.postServices.getPostById(this.post._id).subscribe({
          next: (updatedPost) => {
            this.checked = !this.checked;
            this.post = updatedPost;
            this.cdRef.markForCheck();
          },
          error: (err) => {
            this.toastr.error('Failed to reload post data');
            console.error('Fetch post error:', err);
          }
        });
      },
      error: (err) => {
        this.toastr.error('Failed to update like status');
        console.error('Like error:', err);
      }
    });
  }
}
