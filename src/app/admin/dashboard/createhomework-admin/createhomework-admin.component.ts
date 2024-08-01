import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-createhomework-admin',
  templateUrl: './createhomework-admin.component.html',
  styleUrls: ['./createhomework-admin.component.scss'],
})
export class CreatehomeworkAdminComponent implements OnInit {
  homeworkForm!: FormGroup;
  categories = ['BEGINNER', 'INTERMEDIATE', 'ADVANCE'];
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private homeworkService: ServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.homeworkForm = this.fb.group({
      // title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      Files: [null, Validators.required],
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.homeworkForm.patchValue({
        Files: file,
      });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitHomework(): void {
    if (this.homeworkForm.valid) {
      const formData = new FormData();
      // formData.append('title', this.homeworkForm.get('title')!.value);
      formData.append(
        'description',
        this.homeworkForm.get('description')!.value
      );
      formData.append('category', this.homeworkForm.get('category')!.value);
      formData.append('Files', this.homeworkForm.get('Files')!.value);

      this.homeworkService.createHomework(formData).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.toastr.success('Homework created successfully', 'Success');
            this.router.navigate(['/home']);
            this.homeworkForm.reset();
          } else {
            this.toastr.error(response.msg, 'Error');
          }
        },
        (error) => {
          this.toastr.error(
            error?.error?.msg || 'Something went wrong',
            'Error'
          );
        }
      );
    }
  }
}
