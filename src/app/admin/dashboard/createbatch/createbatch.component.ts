import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-createbatch',
  templateUrl: './createbatch.component.html',
  styleUrls: ['./createbatch.component.scss'],
})
export class CreatebatchComponent implements OnInit {
  batchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private batchService: ServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.batchForm = this.fb.group({
      batchName: ['', Validators.required],
      batchAddress: ['', Validators.required],
    });
  }

  postBatch(): void {
    if (this.batchForm.valid) {
      const batchData = {
        batchName: this.batchForm.get('batchName')!.value,
        batchAddress: this.batchForm.get('batchAddress')!.value,
      };

      this.batchService.createBatch(batchData).subscribe(
        (response) => {
          if (response.status === 'success') {
            console.log('Batch created successfully');
            this.batchForm.reset();
            this.toastr.success('Batch created successfully', 'Success');
            this.router.navigate(['/create_batch']); // Adjust the route as necessary
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
