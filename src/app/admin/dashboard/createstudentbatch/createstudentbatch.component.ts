import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-createstudentbatch',
  templateUrl: './createstudentbatch.component.html',
  styleUrls: ['./createstudentbatch.component.scss'],
})
export class CreatestudentbatchComponent implements OnInit {
  studentBatchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentBatchService: ServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.studentBatchForm = this.fb.group({
      batchName: ['', Validators.required],
      batchAddress: ['', Validators.required],
    });
  }

  postStudentBatch(): void {
    if (this.studentBatchForm.valid) {
      const batchData = {
        batchName: this.studentBatchForm.get('batchName')!.value,
        batchAddress: this.studentBatchForm.get('batchAddress')!.value,
      };

      this.studentBatchService.addStudentBatch(batchData).subscribe(
        (response) => {
          if (response.status === 'success') {
            console.log('Student batch created successfully');
            this.studentBatchForm.reset();
            this.toastr.success(
              'Student batch created successfully',
              'Success'
            );
            this.router.navigate(['/list_of_students']); // Adjust the route as necessary
          } else {
            console.error('Batch creation failed', response.msg);
          }
        },
        (error) => {
          console.error('Batch creation error', error);
          this.toastr.error(
            error?.error?.msg || 'Something Went Wrong',
            'Error'
          );
        }
      );
    }
  }
}
