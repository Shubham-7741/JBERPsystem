import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-courses-forstudents',
  templateUrl: './courses-forstudents.component.html',
  styleUrls: ['./courses-forstudents.component.scss'],
})
export class CoursesForstudentsComponent implements OnInit {
  courses: any[] = [];
  isModalOpen = false;
  courseToBuy: any;
  paymentReceipt: File | null = null;
  txnId: string = '';

  constructor(
    private courseService: ServiceService,
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(
      (data) => {
        console.log('All Courses getting', data);
        this.courses = data.courses;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  openBuyCourseModal(course: any, content: any) {
    this.courseToBuy = course;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          console.log(`Closed with: ${result}`);
        },
        (reason) => {
          console.log(`Dismissed: ${reason}`);
        }
      );
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.paymentReceipt = fileList[0];
    }
  }

  submitBuyCourse(modal: any) {
    if (this.paymentReceipt && this.txnId && this.courseToBuy) {
      const formData = new FormData();
      formData.append('paymentRecipt', this.paymentReceipt);
      formData.append('courseId', this.courseToBuy._id);
      formData.append('txdId', this.txnId);

      this.courseService.buyCourse(formData).subscribe(
        (response) => {
          // Handle success, e.g., close modal and show confirmation
          if (response.status === 'success') {
            modal.close();
            console.log('Course bought successfully!');
            this.toastr.success('Course bought successfully!', 'Success');
            this.router.navigate(['/courses_for_students']);
          } else {
            console.error('Error buying course', response.msg);
          }
        },
        (error) => {
          // Handle error
          console.error('Error buying course:', error);
          this.toastr.error(
            error?.error?.msg || 'Something Went Wrong',
            'Error'
          );
        }
      );
    }
  }
}
