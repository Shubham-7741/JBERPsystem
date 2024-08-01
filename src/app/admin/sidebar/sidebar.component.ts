import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  role!: string | null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
  }

  logout(): void {
    this.authService.logout().subscribe(
      (response) => {
        if (response.status === 'success') {
          this.router.navigate(['/login']); // Redirect to login or home page
        } else {
          console.error('Logout failed', response.msg);
        }
      },
      (error) => {
        console.error('Logout error', error);
      }
    );
  }
}
