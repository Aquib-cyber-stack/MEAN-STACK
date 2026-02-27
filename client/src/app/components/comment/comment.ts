import { Component, Input } from '@angular/core';
import { IComment } from '../../interfaces/commentInterface';

@Component({
  selector: 'app-comment',
  standalone: false,
  templateUrl: './comment.html',
  styleUrl: './comment.css'
})
export class Comment {
  @Input() comment!: IComment;
}
