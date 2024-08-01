import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-notification-teacher',
  templateUrl: './notification-teacher.component.html',
  styleUrls: ['./notification-teacher.component.scss']
})
export class NotificationTeacherComponent implements OnInit {
  notifications: any = { forMe: [], ofMyBranch: [] };
  showNotifications = false;

  constructor(private notificationService: ServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.fetchNotifications();
  }

  isTeacher(): boolean {
    return localStorage.getItem('role') === 'TEACHER';
  }

  // getNotifications(): void {
  //   const token = localStorage.getItem('token');
  //   this.notificationService.getNotifications(token).subscribe(
  //     (response) => {
  //       if (response.status === 'success') {
  //         this.notifications = response.data.forMe; // or another relevant field
  //         console.log('Notifications fetched:', this.notifications);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching notifications', error);
  //       this.toastr.error('Failed to fetch notifications', 'Error');
  //     }
  //   );
  // }
}
