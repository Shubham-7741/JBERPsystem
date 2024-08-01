import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { ServiceService } from 'src/app/shared/service.service';
import { AuthService } from 'src/app/shared/service/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  notifications: any = { forMe: [], ofMyBranch: [] };
  showNotifications = false;
  unreadCount = 0;


  constructor(private observer: BreakpointObserver, private authService: AuthService,
    private notificationService: ServiceService, private cdr: ChangeDetectorRef) { }


  ngAfterViewInit(): void {
    this.observer.observe(['(max-width:800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
    if (this.isTeacherLoggedIn()) {
      this.loadNotifications();
    }

    this.cdr.detectChanges();
  }

  isTeacherLoggedIn(): boolean {
    return this.authService.isTeacherLoggedIn();
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.loadNotifications();
    }
  }


  closeNotifications(): void {
    this.showNotifications = false;
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      (response) => {
        if (response.status === 'success') {
          this.notifications = response.data;
          this.calculateUnreadCount();
        }
      },
      (error) => {
        console.error('Error loading notifications', error);
      }
    );
  }

  calculateUnreadCount(): void {
    this.unreadCount = this.notifications.forMe.length + this.notifications.ofMyBranch.length;
  }

}
