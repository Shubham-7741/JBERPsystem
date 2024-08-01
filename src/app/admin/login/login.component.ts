import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userData: any;
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          if (response.status === 'success') {
            const role = response.data.role;
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('role', role);
            localStorage.setItem('token', response.token);

            if (role === 'TEACHER') {
              this.toastr.success('Login as Teacher successfully!!', 'Success');
              this.router.navigate(['/mark_attendance_teacher']);
            } else if (role === 'STUDENT') {
              this.toastr.success('Login as Student successfully!!', 'Success');
              this.router.navigate(['/courses_for_students']);
            } else if (role === 'ADMIN') {
              this.toastr.success('Login as Admin successfully!!', 'Success');
              this.router.navigate(['/dashboard']);
            }
          } else {
            console.log('Login failed', response.msg);
            this.toastr.error('Login failed check credentials ', 'Error');
          }
        },
        (error) => {
          console.error('Login error', error);
          this.toastr.error(
            error?.error?.msg || 'Something Went Wrong ',
            'Error'
          );
        }
      );
    }
  }
}
