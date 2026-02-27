import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../services/user/user-services';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private userService: UserService,  
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(): boolean {
    const isAuthenticated = this.userService.isLoggedIn();
    if (isAuthenticated) {
      this.toastr.warning('You are already logged in , logout first to change your account.');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
