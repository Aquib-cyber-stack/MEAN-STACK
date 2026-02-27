import { Component } from '@angular/core';
import { UserService } from '../../services/user/user-services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  logout() {
    this.userService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.toastr.success('Logout successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
        this.toastr.error('Logout failed');
      }
    });
  }
}
