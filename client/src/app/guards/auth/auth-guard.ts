import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user/user-services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(): boolean {
    const isAuthenticated = this.userService.isLoggedIn();

    if (!isAuthenticated) {
      this.toastr.warning('You must be logged in to access this page');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
