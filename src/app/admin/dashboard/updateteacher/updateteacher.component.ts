import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-updateteacher',
  templateUrl: './updateteacher.component.html',
  styleUrls: ['./updateteacher.component.scss'],
})
export class UpdateteacherComponent implements OnInit {
  updateTeacherForm!: FormGroup;
  hidePassword: boolean = false;
  hideCPassword: boolean = false;
  showUpdate: boolean = false;
  showDelete: boolean = false;
  showSubmit: boolean = true;
  teacherId!: string; // Non-null assertion operator
  teacherEmail!: string; // Non-null assertion operator
  batches: any[] = [];

  constructor(
    private fb: FormBuilder,
    private teacherService: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.updateTeacherForm = this.fb.group({
      // name: ['', Validators.required],
      address: ['', Validators.required],
      // mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      // password: ['', Validators.required],
      // conPassword: ['', Validators.required],
      startingDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      teachercategory: ['', Validators.required], // Renamed to teachercategory
      customCategory: [''],
      teacherSalary: [''],
      // batchName: ['', Validators.required],
    });

    this.fetchBatches();

    this.route.params.subscribe((val) => {
      this.teacherId = val['id']; // Assuming the parameter name is 'id'
      // Fetch the product details using the ID and populate the form
      this.teacherService.getTeacherById(this.teacherId).subscribe({
        next: (res) => {
          this.onedit(res.teacher);
          console.log('Teachers Details:', res.teacher);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  onedit(teacher: any) {
    this.showSubmit = false;
    this.showUpdate = true;
    this.showDelete = true;

    this.updateTeacherForm.patchValue({
      address: teacher.address,
      email: teacher.email,
      teacherSalary: teacher.teacherSalary,
      startingDate: teacher.startingDate,
      teachercategory: teacher.teachercategory,
    });
  }

  onCategoryChange(): void {
    const categoryControl = this.updateTeacherForm.get('teachercategory');
    if (categoryControl?.value !== 'Custom') {
      this.updateTeacherForm.get('customCategory')?.reset('');
      this.updateTeacherForm.get('customCategory')?.clearValidators();
    } else {
      this.updateTeacherForm
        .get('customCategory')
        ?.setValidators(Validators.required);
    }
    this.updateTeacherForm.get('customCategory')?.updateValueAndValidity();
  }

  fetchBatches(): void {
    this.teacherService.getAllBatchNames().subscribe(
      (data) => {
        console.log('ALL Batches', data.batches);
        this.batches = data.batches; // Assuming the response is an array of batch names
      },
      (error) => {
        console.error('Error fetching batch names', error);
      }
    );
  }

  updateTeacherDetails(): void {
    if (this.updateTeacherForm.valid && this.teacherId) {
      this.teacherService
        .updateTeacher(this.teacherId, this.updateTeacherForm.value)
        .subscribe(
          (response) => {
            if (response.status === 'success') {
              this.toastr.success('Teacher updated successfully', 'Success');
              this.router.navigate(['/list_of_teachers']);
            } else {
              console.error('Teacher update failed', response.msg);
              this.toastr.error('Teacher update failed', 'Error');
            }
          },
          (error) => {
            console.error('Error updating teacher', error);
            this.toastr.error(
              error.error?.msg || 'Something went wrong',
              'Error'
            );
          }
        );
    } else {
      this.toastr.error('Please fill all the fields', 'Error');
    }
  }

  //delete teacher
  deleteTeacher(): void {
    if (this.teacherId) {
      this.teacherService.deleteTeacher(this.teacherId).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.toastr.success('Teacher deleted successfully', 'Success');
            this.router.navigate(['/list_of_teachers']);
          } else {
            console.error('Teacher delete failed', response.msg);
            this.toastr.error('Teacher delete failed', 'Error');
          }
        },
        (error) => {
          console.error('Error deleting teacher', error);
          this.toastr.error(
            error.error?.msg || 'Something went wrong',
            'Error'
          );
        }
      );
    }
  }

  // updateTeacherDetails(): void {
  //   if (this.updateTeacherForm.valid && this.teacherId) {
  //     this.teacherService
  //       .updateTeacher(this.teacherId, this.updateTeacherForm.value)
  //       .subscribe(() => {
  //         this.toastr.success('Teacher updated successfully', 'Success');
  //         this.router.navigate(['/list_of_teachers']);
  //       });
  //   } else {
  //     this.toastr.error('Please fill all the fields', 'Error');
  //   }
  // }

  togglePasswordVisibility(field: string): void {
    const inputField = document.getElementById(field) as HTMLInputElement;
    inputField.type = inputField.type === 'password' ? 'text' : 'password';
  }
}
