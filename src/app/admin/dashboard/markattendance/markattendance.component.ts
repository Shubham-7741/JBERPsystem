import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-markattendance',
  templateUrl: './markattendance.component.html',
  styleUrls: ['./markattendance.component.scss'],
})
export class MarkattendanceComponent implements OnInit {
  // attendanceForm!: FormGroup;
  // isPresent: boolean = false;
  // selectedFile!: File;
  // imagePreview: string | ArrayBuffer | null = null;

  // constructor(
  //   private fb: FormBuilder,
  //   private authService: AuthService,
  //   private http: HttpClient,
  //   private router: Router,
  //   private toastr: ToastrService
  // ) {}

  // ngOnInit(): void {
  //   this.attendanceForm = this.fb.group({
  //     status: ['', Validators.required],
  //     // todaysTask: ['', Validators.required],
  //     halfDay: ['false'],
  //   });
  // }

  // onStatusChange(event: any): void {
  //   this.isPresent = event.value === 'Present';
  // }

  // onFileChange(event: any): void {
  //   if (event.target.files.length > 0) {
  //     this.selectedFile = event.target.files[0];

  //     // Show image preview
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imagePreview = reader.result;
  //     };
  //     reader.readAsDataURL(this.selectedFile);
  //   }
  // }

  // markAttendance(): void {
  //   if (this.attendanceForm.valid && this.selectedFile) {
  //     const formData = new FormData();
  //     formData.append('image', this.selectedFile);
  //     formData.append('status', this.attendanceForm.get('status')?.value);
  //     // formData.append(
  //     //   'todaysTask',
  //     //   this.attendanceForm.get('todaysTask')?.value
  //     // );
  //     formData.append('halfDay', this.attendanceForm.get('halfDay')?.value);

  //     const token = localStorage.getItem('token');
  //     // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //     this.http.post('/api/v1/teacher/markPresent', formData).subscribe(
  //       (response: any) => {
  //         if (response.status === 'success') {
  //           this.attendanceForm.reset();
  //           this.toastr.success('Attendance marked successfully', 'Success');
  //           this.router.navigate(['/mark_attendance_teacher']);
  //         } else {
  //           this.toastr.error('Failed to mark attendance', 'Error');
  //         }
  //       },
  //       (error) => {
  //         console.error('Error:', error);
  //         this.toastr.error(
  //           error?.error?.msg || 'Something Went Wrong ',
  //           'Error'
  //         );
  //       }
  //     );
  //   } else {
  //     this.toastr.error('Please fill all the fields and upload image', 'Error');
  //   }
  // }

  attendanceForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  isPresent: boolean = false;

  constructor(
    private fb: FormBuilder,
    private attendanceService: ServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.attendanceForm = this.fb.group({
      image: [null, Validators.required],
      status: ['', Validators.required],
      halfDay: [null],
    });
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    this.attendanceForm.patchValue({ image: file });
    this.attendanceForm.get('image')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onStatusChange(event: any): void {
    this.isPresent = event.value === 'Present';
    if (!this.isPresent) {
      this.attendanceForm.get('halfDay')?.setValue(null);
    }
  }

  markAttendance(): void {
    const d = new Date();
    if (this.attendanceForm.valid) {
      const formData = new FormData();
      formData.append('image', this.attendanceForm.get('image')!.value);
      formData.append('status', this.attendanceForm.get('status')!.value);
      formData.append('time', d.toLocaleTimeString());
      if (this.isPresent) {
        formData.append('halfDay', this.attendanceForm.get('halfDay')!.value);
      }

      this.attendanceService.markAttendance(formData).subscribe(
        (response) => {
          this.toastr.success('Attendance marked successfully', 'Success');
          this.attendanceForm.reset();
          this.imagePreview = null;
          this.router.navigate(['/attendance-list']);
        },
        (error) => {
          this.toastr.error(
            error?.error?.msg || 'Something Went Wrong',
            'Error'
          );
        }
      );
    }
  }
}
