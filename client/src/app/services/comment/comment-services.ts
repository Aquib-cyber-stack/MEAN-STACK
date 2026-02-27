import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environment/environment';
import { IComment } from '../../interfaces/commentInterface';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CommentServices {
  private apiUrl = `${env.apiUrl}/comments`;

  constructor(private http: HttpClient , private cookieService: CookieService) { }

  createComment(comment: IComment , postId: string): Observable<IComment> {
    const token = this.cookieService.get('authToken');
    if (!token) {
      return new Observable<IComment>(observer => {
        observer.error('No auth token found');
        observer.complete();
      });
    }
    return this.http.post<IComment>(`${this.apiUrl}/${postId}`, comment , {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
  }

    getComments(postId: string): Observable<IComment[]> {
      const token = this.cookieService.get('authToken');
      if (!token) {
        return new Observable<IComment[]>(observer => {
          observer.error('No auth token found');
          observer.complete();
        });
      }

      return this.http.get<{ status: string; data: IComment[] }>(`${this.apiUrl}/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).pipe(
        map(response => response.data) 
      );
    }
}
