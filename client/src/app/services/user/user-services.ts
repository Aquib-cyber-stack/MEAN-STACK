import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environment/environment';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/userInterface';
import { IAuth } from '../../interfaces/authInterface';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${env.apiUrl}/users`;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  
  signUp(user: IUser): Observable<IAuth> {
    return this.http.post<IAuth>(`${this.apiUrl}/signup`, user);
  }

  login(user: IUser): Observable<IAuth> {
    return this.http.post<IAuth>(`${this.apiUrl}/login`, user);
  }

  logout(): Observable<void> {
    const token = this.cookieService.get('authToken');

    if (!token) {
      return new Observable<void>(observer => {
        observer.error('No auth token found');
        observer.complete();
      });
    }
    this.cookieService.delete('authToken', '/');
    this.cookieService.delete('user', '/');


    return this.http.post<void>(
      `${this.apiUrl}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }


  isLoggedIn(): boolean {
    return this.cookieService.check('authToken');
  }
}
