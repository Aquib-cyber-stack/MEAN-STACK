import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environment/environment';
import { IPost } from '../../interfaces/postInterface';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServices {
  private apiUrl = `${env.apiUrl}/posts`
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { };

  createPost(post: IPost): Observable<IPost> {
    const token = this.cookieService.get('authToken');
    if (!token) {
      return new Observable<IPost>(observer => {
        observer.error('No auth token found');
        observer.complete();
      });
    }
    return this.http.post<IPost>(`${this.apiUrl}/create`, post, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getPosts(): Observable<IPost[]> {
    if (!this.cookieService.check('authToken')) {
      return new Observable<IPost[]>(observer => {
        observer.error('No auth token found');
        observer.complete();
      });
    }
    
    return this.http.get<{ status: string; data: IPost[] }>(`${this.apiUrl}/all`, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('authToken')}`
      }
    }).pipe(
      map(response => response.data)
    );
  }

  getPostById(postId: string): Observable<IPost> {
    if (!this.cookieService.check('authToken')) {
      return new Observable<IPost>(observer => {
        observer.error('No auth token found');
        observer.complete();
      });
    }
    
    return this.http.get<{ status: string; data: IPost }>(`${this.apiUrl}/${postId}`, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('authToken')}`
      }
    }).pipe(
      map(response => response.data)
    );
  }


  getPostsByUser(): Observable<IPost[]> {
    if (!this.cookieService.check('authToken')) {
      return new Observable<IPost[]>(observer => {
        observer.error('No auth token found');
        observer.complete();
      });
    }
    
    return this.http.get<{ status: string; data: IPost[] }>(`${this.apiUrl}/userPosts`, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('authToken')}`
      }
    }).pipe(
      map(response => response.data)
    );
  }

  deleteMyPost(postId: string): Observable<IPost> {
    const token = this.cookieService.get('authToken');
    if (!token) {
      return new Observable<IPost>(observer => {
        observer.error('No auth token found');
        observer.complete();
      });
    }
    
    return this.http.delete<IPost>(`${this.apiUrl}/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  likePost(postId: string): Observable<IPost> {
    const token = this.cookieService.get('authToken');
    if (!token) {
      return new Observable<IPost>(observer => {
        observer.error('No auth token found');
        observer.complete();
      });
    }
    
    return this.http.post<IPost>(`${this.apiUrl}/${postId}/like`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  unlikePost(postId: string): Observable<IPost> {
    const token = this.cookieService.get('authToken');
    if (!token) {
      return new Observable<IPost>(observer => {
        observer.error('No auth token found');
        observer.complete();
      });
    }
    
    return this.http.post<IPost>(`${this.apiUrl}/${postId}/unlike`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
