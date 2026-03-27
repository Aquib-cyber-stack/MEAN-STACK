import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment as env } from '../../environment/environment';
import { IPost } from '../../interfaces/postInterface';
import { CookieService } from 'ngx-cookie-service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostServices {
  private apiUrl = `${env.apiUrl}/posts`;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  // Helper to get headers and handle missing token
  private getAuthHeaders(): HttpHeaders | null {
    const token = this.cookieService.get('authToken');
    if (!token) return null;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createPost(post: IPost): Observable<IPost> {
    const headers = this.getAuthHeaders();
    if (!headers) return throwError(() => 'No auth token found');

    return this.http.post<IPost>(`${this.apiUrl}/create`, post, { headers });
  }

  // --- NEW UPDATE METHOD ---
  updatePost(postId: string, postData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return throwError(() => 'No auth token found');

    return this.http.put<any>(`${this.apiUrl}/${postId}`, postData, { headers });
  }

  getPosts(): Observable<IPost[]> {
    const headers = this.getAuthHeaders();
    if (!headers) return throwError(() => 'No auth token found');

    return this.http.get<{ status: string; data: IPost[] }>(`${this.apiUrl}/all`, { headers }).pipe(
      map(response => response.data)
    );
  }

  getPostById(postId: string): Observable<IPost> {
    const headers = this.getAuthHeaders();
    if (!headers) return throwError(() => 'No auth token found');

    return this.http.get<{ status: string; data: IPost }>(`${this.apiUrl}/${postId}`, { headers }).pipe(
      map(response => response.data)
    );
  }

  getPostsByUser(): Observable<IPost[]> {
    const headers = this.getAuthHeaders();
    if (!headers) return throwError(() => 'No auth token found');

    return this.http.get<{ status: string; data: IPost[] }>(`${this.apiUrl}/userPosts`, { headers }).pipe(
      map(response => response.data)
    );
  }

  deleteMyPost(postId: string): Observable<IPost> {
    const headers = this.getAuthHeaders();
    if (!headers) return throwError(() => 'No auth token found');

    return this.http.delete<IPost>(`${this.apiUrl}/${postId}`, { headers });
  }

  likePost(postId: string): Observable<IPost> {
    const headers = this.getAuthHeaders();
    if (!headers) return throwError(() => 'No auth token found');

    return this.http.post<IPost>(`${this.apiUrl}/${postId}/like`, {}, { headers });
  }

  unlikePost(postId: string): Observable<IPost> {
    const headers = this.getAuthHeaders();
    if (!headers) return throwError(() => 'No auth token found');

    return this.http.post<IPost>(`${this.apiUrl}/${postId}/unlike`, {}, { headers });
  }
}
