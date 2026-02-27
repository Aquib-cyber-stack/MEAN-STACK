import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user-services';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  signUpForm: FormGroup;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      imgUrl: ['']
    }, { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator(form: FormGroup) { 
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  onSubmit() {
    if (this.signUpForm.valid) {
      this.userService.signUp(this.signUpForm.value).subscribe({
        next: (res) => {
          this.cookieService.set('authToken', res.data.token, {
            path: '/',
            secure: true,
            sameSite: 'Lax',
            expires: 1
          });
          this.cookieService.set("user", JSON.stringify(res.data.user), {
            path: '/',
            secure: true,
            sameSite: 'Lax',
            expires: 1
          });
          this.toastr.success('Sign up successful');
          this.signUpForm.reset();
          console.log('Sign up successful');
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Sign up failed', err);
          this.toastr.error('Sign up failed');
        }
      });
    }
    else {
      this.toastr.error('Please fill in the form correctly');
      console.log('Sign up form is invalid');
    }
  }
}
