import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-leaverequest-teacher',
  templateUrl: './leaverequest-teacher.component.html',
  styleUrls: ['./leaverequest-teacher.component.scss']
})
export class LeaverequestTeacherComponent implements OnInit {
  leaveForm: FormGroup;
  docPreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private leaveService: ServiceService,
    private toastr: ToastrService
  ) {
    this.leaveForm = this.fb.group({
      reason: ['', Validators.required],
      dateOfthisMonth: ['', Validators.required],
      doc: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.leaveForm.patchValue({ doc: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.docPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitLeaveRequest(): void {
    const formData = new FormData();
    formData.append('doc', this.leaveForm.get('doc')!.value);
    formData.append('reason', this.leaveForm.get('reason')!.value);
    formData.append('dateOfthisMonth', this.leaveForm.get('dateOfthisMonth')!.value);

    this.leaveService.postLeaveRequest(formData).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.toastr.success(response.msg); 
          this.leaveForm.reset();
          this.docPreview = null;
        } else {
          this.toastr.error('Failed to submit leave request');
        }
      },
      (error) => {
        this.toastr.error('An error occurred while submitting leave request');
      }
    );
  }
}
