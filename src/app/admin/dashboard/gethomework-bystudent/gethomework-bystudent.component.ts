import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-gethomework-bystudent',
  templateUrl: './gethomework-bystudent.component.html',
  styleUrls: ['./gethomework-bystudent.component.scss'],
})
export class GethomeworkBystudentComponent implements OnInit {
  homeworks: any[] = [];
  imageToShow: string | null = null;

  constructor(
    private homeworkService: ServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getHomework();
  }

  getHomework(): void {
    this.homeworkService.getHomeworkByStudent().subscribe(
      (response) => {
        if (response.status === 'success') {
          console.log('Getting all homework List', response.homeworks);
          this.homeworks = response.homeworks;
        } else {
          this.toastr.error('Failed to fetch homework', 'Error');
        }
      },
      (error) => {
        this.toastr.error('Failed to fetch homework', 'Error');
        this.toastr.error(error?.error?.msg || 'Something Went Wrong', 'Error');
      }
    );
  }

  openImage(imageSrc: string) {
    this.imageToShow = imageSrc;
  }

  closeImage() {
    this.imageToShow = null;
  }
}
