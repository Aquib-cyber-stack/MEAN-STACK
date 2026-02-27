import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user-services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;


  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService,
    private toastr: ToastrService
  ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.cookieService.set('authToken', res.data.token, {
            path: '/',
            secure: true,
            sameSite: 'Lax',
            expires: 1
          });
          this.cookieService.set("user" , JSON.stringify(res.data.user), { 
            path: '/', 
            secure: true, 
            sameSite: 'Lax', 
            expires: 1 
          });
          this.toastr.success('Login successful');
          this.loginForm.reset();
          console.log('Login successful');
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.toastr.error('Login failed');
        }
      });
    }
    else {
      this.toastr.error('Please fill in the form correctly');
      console.log('Login form is invalid');
    }
  }
}
