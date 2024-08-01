import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-courses-admin',
  templateUrl: './courses-admin.component.html',
  styleUrls: ['./courses-admin.component.scss'],
})
export class CoursesAdminComponent implements OnInit {
  courseForm: FormGroup;
  categories: string[] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCE'];

  constructor(
    private fb: FormBuilder,
    private courseService: ServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.courseService.createCourses(this.courseForm.value).subscribe(
        (response) => {
          console.log('Course created successfully:', response);
          this.courseForm.reset();
          this.toastr.success('Course created successfully');
          // this.router.navigate(['/admin/courses']); // Redirect to courses list or another appropriate page
        },
        (error) => {
          console.error('Error creating course:', error);
          this.toastr.error(
            error.error?.msg || 'Something went wrong',
            'Error'
          );
        }
      );
    }
  }
}
