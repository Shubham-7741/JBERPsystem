import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-teachertask',
  templateUrl: './teachertask.component.html',
  styleUrls: ['./teachertask.component.scss'],
})
export class TeachertaskComponent implements OnInit {
  todaysTaskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teacherService: ServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.todaysTaskForm = this.fb.group({
      description: ['', Validators.required],
    });
  }

  submitTask(): void {
    if (this.todaysTaskForm.valid) {
      const formData = this.todaysTaskForm.value;
      this.teacherService.addTask(formData).subscribe(
        (response) => {
          console.log('Task submitted successfully', response);
          this.toastr.success('Task submitted successfully', 'Success');
          this.todaysTaskForm.reset();
          this.router.navigate(['/add_new_todays_task']); // Adjust the route as needed
        },
        (error) => {
          console.error('Error submitting task', error);
          this.toastr.error(
            error?.error?.msg || 'Something Went Wrong',
            'Error'
          );
        }
      );
    }
  }
}
